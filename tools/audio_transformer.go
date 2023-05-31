package main

import (
    "fmt"
    "log"
    "os"
    "os/exec"
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

    for _, filename := range filenames {
        err := run("ffmpeg -i %[1]v.m4a -c:a libvorbis %[1]v.oga", filename)
        if err != nil {
            return err
        }

        err = run("ffmpeg -i %[1]v.m4a %[1]v.mp3", filename)
        if err != nil {
            return err
        }
    }

    return nil
}

func run(command, filename string) error {
    cmdToRun := strings.Split(fmt.Sprintf(command, filename), " ")
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
