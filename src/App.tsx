import { useState } from "react"
import { orixaList } from "./mocks/orixaList"
import "./App.css"

function App() {
	const [name, setName] = useState("")
	const [birthday, setBirthday] = useState("")
	const [vowels, setVowels] = useState<number>(0)
	const [consonant, setConsonant] = useState<number>(0)
	const [dateSum, setDateSum] = useState<number>(0)
	const [result, setResult] = useState<number>(0)
	const [orixas, setOrixas] = useState({
		vowels: "",
		consonant: "",
		lettersSum: "",
		dateSum: "",
		result: "",
	})

	const sumVowels = (name: string): number => {
		const vowelList = name.match(/[aeiou]/gi)
		const vowelsTotal = vowelList!.length
		setVowels(vowelsTotal - 1)
		return vowelsTotal - 1
	}

	const sumConsonants = (name: string): number => {
		const consonantList = name.match(/[bcdfghjklmnpqrstvwxyz]/gi)
		const consonantTotal = consonantList!.length
		setConsonant(consonantTotal + 1)
		return consonantTotal + 1
	}

	const sumDigits = (num: number) => {
		let sum = 0
		while (parseInt(String(num))) {
			sum += num % 10
			num = Math.floor(num / 10)
		}
		return sum
	}

	const sumDate = (birthday: string): number => {
		const [year, month, day] = birthday.split("-")

		const sumYear = sumDigits(Number(year))
		const sumMonth = sumDigits(Number(month))
		const sumDay = sumDigits(Number(day))
		const digitSum = sumYear + sumMonth + sumDay
		setDateSum(digitSum)

		return sumYear + sumMonth + sumDay
	}

	const findOrixa = (number: number): string => {
		const orixa = orixaList.find((orixa) => orixa.numero === number)
		return orixa!.nome
	}

	const handleNumerology = () => {
		if (name !== "" && birthday !== "") {
			const vowelsResult = sumVowels(name)
			const consonantResult = sumConsonants(name)
			const dateResult = sumDate(birthday)
			const totalResult = vowelsResult! + consonantResult! + dateResult
			setResult(totalResult)

			setOrixas({
				vowels: findOrixa(vowelsResult),
				consonant: findOrixa(consonantResult),
				lettersSum: findOrixa(vowelsResult! + consonantResult!),
				dateSum: findOrixa(dateResult),
				result: findOrixa(totalResult),
			})
		} else {
			alert("Preencha os campos")
		}
	}

	return (
		<>
			<h1>Numerologia</h1>
			<form id="form">
				<label htmlFor="full-name">Nome completo</label>
				<input
					type="text"
					id="full-name"
					onChange={(e) => {
						setResult(0)
						setName(e.target.value)
					}}
					required
				/>
				<label htmlFor="birth-date">Data de nascimento</label>
				<input
					type="date"
					id="birth-date"
					onChange={(e) => {
						setResult(0)
						setBirthday(e.target.value)
					}}
					required
				/>
				<button type="button" onClick={handleNumerology}>
					Calcular
				</button>
			</form>
			{result > 0 && (
				<div className="orixa-grid">
					<p>Vogais</p>
					<p className="orixa-number">{vowels}</p>
					<p>{orixas.vowels}</p>
					<p>Consoantes</p>
					<p className="orixa-number">{consonant}</p>
					<p>{orixas.consonant}</p>
					<p>Soma das letras</p>
					<p className="orixa-number">{vowels + consonant}</p>
					<p>{orixas.lettersSum}</p>
					<p>Soma da data</p>
					<p className="orixa-number">{dateSum}</p>
					<p>{orixas.dateSum}</p>
					<p>Resultado</p>
					<p className="orixa-number">{result}</p>
					<p>{orixas.result}</p>
				</div>
			)}
		</>
	)
}

export default App
