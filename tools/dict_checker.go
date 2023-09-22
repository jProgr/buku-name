package main

import (
    "encoding/csv"
    "errors"
    "fmt"
    "log"
    "os"
    "slices"
)

func main() {
    if err := do(); err != nil {
        log.Fatalln(err)
    }
}

// do checks that the dictionary does not have duplicate
// entries.
func do() error {
    dictionaryPath := "src/data/mini_dictionary.csv"

    // Read file.
    file, err := os.Open(dictionaryPath)
    if err != nil {
        return err
    }
    defer file.Close()

    csvReader := csv.NewReader(file)
    csvReader.Comma = ';'
    dictionary, err := csvReader.ReadAll()
    if err != nil {
        return err
    }

    // Set apart only the words, meanings are not needed.
    var words []string
    for i, term := range dictionary {
        // Skip header.
        if i == 0 {
            continue
        }
        words = append(words, term[0])
    }

    // If any duplicates, print and error.
    duplicates := getDuplicates(words)
    if len(duplicates) > 0 {
        for _, word := range duplicates {
            log.Println(word)
        }

        return errors.New(fmt.Sprintf("Duplicates found in %s", dictionaryPath))
    }

    return nil
}

func getDuplicates(slice []string) []string {
    var sliceCopy []string
    var duplicates []string
    for _, element := range slice {
        if slices.Contains(sliceCopy, element) {
            duplicates = append(duplicates, element)
        }

        sliceCopy = append(sliceCopy, element)
    }

    return toUnique(duplicates)
}

func toUnique(slice []string) (uniques []string) {
    set := make(map[string]bool)
    for _, element := range slice {
        if !set[element] {
            set[element] = true
        }
    }

    for value, _ := range set {
        uniques = append(uniques, value)
    }

    return
}
