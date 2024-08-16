const textarea = document.querySelector("textarea")
const wordsDisplay = document.querySelector("#words")
const charactersDisplay = document.querySelector("#characters")
const charactersWSDisplay = document.querySelector("#characters-without-space")

textarea.addEventListener("input", () => {
	const text = textarea.value
	const words = text.split(" ")
	const wordsFormatted = words.filter(item => item !== "" && item !== null && item !== undefined && item.trim() !== "")


	charactersDisplay.innerText = text.length
	wordsDisplay.innerText = wordsFormatted.length
	charactersWSDisplay.innerText = (text.replace(/ /g, "")).length
})

const speak = document.querySelector("#speak")
let listening = false
const recognition = new webkitSpeechRecognition()
recognition.lang = 'pt-BR'
recognition.interimResults = false

recognition.onstart = () => {
	textarea.placeholder = 'Fale agora...'
	listening = true
	speak.classList.add("listening")
}

recognition.onresult = (event) => {
	const eventInput = new Event('input')
	
	const transcript = event.results[0][0].transcript
	if(textarea.value.trim()) {
		textarea.value += ` ${transcript}`
	} else {
		textarea.value = transcript
	}
	
	textarea.dispatchEvent(eventInput)
}

recognition.onerror = (event) => {
	textarea.placeholder = 'Erro ao reconhecer fala.'
}

recognition.onend = () => {
	speak.classList.remove("listening")
	textarea.placeholder = ""
	listening = false
}

speak.addEventListener("click", () => {
	if(listening) return
	recognition.start()
})