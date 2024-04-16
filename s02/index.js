sampleVariable = "My Value"

function greetUser(){
	return "Hello!"
}

function addNumbers(num1, num2){
	return num1 + num2;
}

function divisibleBy4(number){
	if(number%4 === 0){
		return true
	}
	else{
		return false
	}
}

module.exports = {
	sampleVariable,
	greetUser,
	divisibleBy4,
	addNumbers
};