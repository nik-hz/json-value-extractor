#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs')

const jsonKeyValuePairExtractor = async (
    seedDataLocation,
    key = process.argv[3],
    filename
) => {
    console.log('')
    console.log('')
    console.log(chalk.green('FIRST ARG - seed data location', seedDataLocation))
    console.log(chalk.green('SECOND ARG - key to extract', key))
    console.log(chalk.green('THIRD ARG - filename to write into', filename))

    // get json one by one
    // write to file
    // close file

    try {
        const data = []
        const finalData = []
        const seedData = require(seedDataLocation)
        const length = seedData.length

        // create new .json file and write into it

        for (let i = 0; i < length; i++) {
            let countI = i
            let countLength = length

            if (length > 1000) {
                countI = Math.round(i / 200)
                countLength = Math.round(length / 200)
            }

            const dots = '|'.repeat(countI)
            const left = countLength - countI
            const empty = ' '.repeat(left)

            process.stdout.write(
                `\r[${dots}${empty}] ${i} / ${length}, ${Math.round(
                    (i / length) * 100
                )}%`
            )

            const nameData = seedData[i]

            data.push(nameData[key])
        }

        //  create and require new JSON file
        fs.writeFileSync(
            `${process.cwd()}/${filename}.json`,
            JSON.stringify(data)
        )
    } catch (error) {
        console.log('')
        console.log('')
        console.log(chalk.red('THERE SEEMS TO BE A PROBLEM'))
        console.log('')
        console.log(chalk.red('Error Mesage'))
        console.log(chalk.red(error))
        console.log('')
        console.log('')
    }
}

jsonKeyValuePairExtractor(process.argv[2], process.argv[3], process.argv[4])
