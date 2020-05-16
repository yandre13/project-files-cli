#!/usr/bin/env node
const shelljs = require('shelljs')
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')

const execute = async () => {
	//Show info in header
	start()
	//Questions to make the file
	const responses = await questions()
	const { file, ext } = responses
	//Create file
	const pathFile = makeFile(file, ext)
	//Show feedback
	if (pathFile) {
		fileOk(pathFile)
	}
}

const start = () => {
	console.log(
		chalk.green(
			figlet.textSync('file Maker', {
				font: 'Banner',
				horizontalLayout: 'default',
				verticalLayout: 'default',
			})
		)
	)
}
const questions = () => {
	const options = [
		{
			name: 'file',
			type: 'input',
			message: 'what is your file name',
		},
		{
			name: 'ext',
			type: 'list',
			message: 'extension for your file?',
			choices: ['.rb', '.js', '.ts', '.java', '.ts', '.php', '.pdf'],
			filter: (val) => val.split('.')[1],
		},
	]
	return inquirer.prompt(options)
}
const makeFile = (file, ext) => {
	const path = `${process.cwd()}/${file}.${ext}`
	shelljs.touch(path)
	return path
}
const fileOk = (filePath) => {
	console.log(chalk.blue(`File created at ${filePath}`))
}
//main
execute()
