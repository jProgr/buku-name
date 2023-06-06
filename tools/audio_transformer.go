package main

import (
    "fmt"
    "log"
    "math/rand"
    "os"
    "os/exec"
    "strconv"
    "strings"
)

func main() {
    if err := do(); err != nil {
        log.Fatalln(err)
    }
}

func do() error {
    dir, err := os.Open(os.Args[1])
    if err != nil {
        return err
    }
    defer dir.Close()

    files, err := dir.Readdirnames(-1)
    if err != nil {
        return err
    }
    filenames := make([]string, len(files))
    for i, filename := range files {
        filenames[i] = strings.Split(filename, ".")[0]
    }
    filenames = removeEmptyStrings(filenames)

    outputDir := fmt.Sprintf(
        "%v/%v",
        os.Args[1],
        strconv.Itoa(rand.Int()),
    )
    if err := os.Mkdir(outputDir, 0755); err != nil {
        return err
    }

    for _, filename := range filenames {
        err := run("ffmpeg -i %[1]v.m4a -filter:a loudnorm %[2]v/%[1]v.m4a", filename, outputDir)
        if err != nil {
            return err
        }

        err = run("ffmpeg -i %[2]v/%[1]v.m4a -c:a libvorbis %[2]v/%[1]v.oga", filename, outputDir)
        if err != nil {
            return err
        }

        err = run("ffmpeg -i %[2]v/%[1]v.m4a %[2]v/%[1]v.mp3", filename, outputDir)
        if err != nil {
            return err
        }
    }

    fmt.Println(outputDir)

    return nil
}

func run(command, filename, outputDir string) error {
    cmdToRun := strings.Split(fmt.Sprintf(command, filename, outputDir), " ")
    cmdName := cmdToRun[0]
    cmdArgs := cmdToRun[1:]

    cmd := exec.Command(cmdName, cmdArgs...)
    cmd.Dir = os.Args[1]

    return cmd.Run()
}

func removeEmptyStrings(strings []string) (nonEmptyStrings []string) {
    for _, str := range strings {
        if str != "" {
            nonEmptyStrings = append(nonEmptyStrings, str)
        }
    }

    return
}
