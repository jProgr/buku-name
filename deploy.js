const fs = require('fs');
const fse = require('fs-extra');
const {execSync} = require('child_process');

// Check we are in the master branch
run(
  'git rev-parse --abbrev-ref HEAD',
  'There was an error checking the current git branch',
  stdout => {
    if (stdout !== 'master') panic('Can only deploy from master branch');
  }
);

// Gather the version number
const version = process.argv[2];

if (typeof version !== 'string') panic('A version number is needed');
run(
  'git tag',
  'There was an error listing tags',
  stdout => {
    if (stdout.includes(version)) panic('Already tagged');
  }
 );

// Gather tag message from CHANGELOG
const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
const titleVersion = '## ' + version;
if (!changelog.includes(titleVersion)) {
  panic('CHANGELOG.md does not have defined changes for version ' + version);
}

const lines = changelog.split('\n');
let tagMessage = getTagMessage(getStartLine(lines), lines)
  .map(line => {
    if (!line.startsWith('##')) return line;

    return line
      .replaceAll('#', '')
      .trim();
  })
  .join('\n');

// Build distributables
run('npm run build', 'There was an error running npm run build');

// Tag
run(`git push origin master`, 'There was an error uploading master branch');
run(`git tag -a ${version} -m ${tagMessage}`, 'There was an error tagging');
run(`git push origin ${version}`, 'There was an error uploading the tag');

// Copy distributables and upload
run('git checkout gh-pages', 'There was an error moving to deploy branch');
fse.copySync('dist/', './');
run('git add .', 'There was an error with git add');
run(`git commit -m ${version}`, 'There was an error making the deploy commit');
run('git push origin gh-pages', 'There was an error uploading gh-pages branch');

// Finally come back to master
run('git checkout master', 'There was an error moving back to master branch');

function panic(message) {
  throw new Error(message);
}

function getStartLine(lines) {
  for (const [i, line] of lines.entries()) {
    if (line.includes(titleVersion)) return i;
  }

  panic('This shouldn\'t happen');
}

function getTagMessage(startLine, lines) {
  let tagMessageLines = [];
  for (let i = startLine + 1; i <= lines.length; i++) {
    if (lines[i].startsWith('## ')) break;
    if (lines[i] !== '') tagMessageLines.push(lines[i]);
  }

  return tagMessageLines;
}

function run(command, errorMessage, checker) {
  let stdout;
  try { stdout = execSync(command); }
  catch(stderr) {
    console.error(`stderr: ${stderr}`);
    panic(errorMessage);
  }

  if (typeof checker === 'function') checker(stdout.toString().trim());
}
