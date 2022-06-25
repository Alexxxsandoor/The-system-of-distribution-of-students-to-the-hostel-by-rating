const studentNotPrioriti = [
	{
		id: 0,
		groupName: "КН",
		groupNumber: 11,
		students: [
			{
				name: "Sasha11.1",
				year: 1,//0,1...n
				privilege: 1,//0,1...n
				nonResident: 1, //0-1
				score: 98,//0,1...100
			},
			{
				name: "Sasha12.1",
				year: 2,
				privilege: 5,
				nonResident: 1,
				score: 98,
			},
			{
				name: "Sasha13.1",
				year: 5,
				privilege: 5,
				nonResident: 1,
				score: 98,
			},
			{
				name: "Sasha14.1",
				year: 5,
				privilege: 1,
				nonResident: 0,
				score: 98,
			},
		]
	},
	{
		id: 0,
		groupName: "КН",
		groupNumber: 11,
		students: [
			{
				name: "Sasha11.1",
				year: 1,//0,1...n
				privilege: 1,//0,1...n
				nonResident: 1, //0-1
				score: 98,//0,1...100
			}
		]
	},
	{
		id: 0,
		groupName: "КН",
		groupNumber: 11,
		students: [
			{
				name: "Sasha11.1",
				year: 1,//0,1...n
				privilege: 1,//0,1...n
				nonResident: 1, //0-1
				score: 98,//0,1...100
			},
			{
				name: "Sasha12.1",
				year: 2,
				privilege: 5,
				nonResident: 1,
				score: 98,
			},
			{
				name: "Sasha13.1",
				year: 5,
				privilege: 5,
				nonResident: 1,
				score: 98,
			},
			{
				name: "Sasha14.1",
				year: 5,
				privilege: 1,
				nonResident: 0,
				score: 98,
			},
		]
	}
]






//--------------------------------------------------------------------------------------------------------------------------------------//

var container = document.getElementById("container")

var groups = []

//Переделываем массив не отсортированный в сортированный
function group(studentNotPrioriti) {


	for (let i = 0; i < studentNotPrioriti.length; i++) {
		groups[i] = {
			id: studentNotPrioriti[i].id,
			groupName: studentNotPrioriti[i].groupName,
			groupNumber: studentNotPrioriti[i].groupNumber,
			students: []
		}

		for (let j = 0; j < studentNotPrioriti[i].students.length; j++) {
			groups[i].students[j] = {
				name: studentNotPrioriti[i].students[j].name,
				prioritie: studentNotPrioriti[i].students[j].year + studentNotPrioriti[i].students[j].privilege + studentNotPrioriti[i].students[j].nonResident + (studentNotPrioriti[i].students[j].score / 100)
			}
		}
	}




}

group(studentNotPrioriti)

allGroupsAndStudents(groups)

//-------------------------создаем окно-------------------------
function createWindow(groups) {




	deleteList()
	allGroupsAndStudents(groups)

	let windowSearch = document.querySelector(".window")

	if (!windowSearch) {

		//-------------------------создаем окно-------------------------
		const window = document.createElement("div")
		window.className = "window"

		container.append(window)

		//-------------------------создаем инпуты-------------------------

		//-------------------------комнаты-------------------------
		const paragrafRooms = document.createElement("p")
		paragrafRooms.innerHTML = "Кількість кімнат:"

		const inputRooms = document.createElement("input")
		inputRooms.setAttribute("type", "number")
		inputRooms.className = "rooms"

		paragrafRooms.append(inputRooms)
		window.append(paragrafRooms)

		//-------------------------места-------------------------
		const paragrafPlaces = document.createElement("p")
		paragrafPlaces.innerHTML = "Кількість місць в кімнаті:"

		const inputPlaces = document.createElement("input")
		inputPlaces.setAttribute("type", "number")
		inputPlaces.className = "places"

		paragrafPlaces.append(inputPlaces)
		window.append(paragrafPlaces)

		//-------------------------дополнительные  места-------------------------
		const paragrafАdditional = document.createElement("p")
		paragrafАdditional.innerHTML = "Додаткові місця:"

		const inputАdditional = document.createElement("input")
		inputАdditional.setAttribute("type", "number")
		inputАdditional.className = "additional"

		paragrafАdditional.append(inputАdditional)
		window.append(paragrafАdditional)

		//-------------------------количество групп-------------------------
		const paragrafPercent = document.createElement("p")
		paragrafPercent.innerHTML = "ДодатСкільки студентів можливо взяти з группи: <hr>"
		window.append(paragrafPercent)

		//-------------------------цикл количества групп-------------------------
		for (let i = 0; i < groups.length; i++) {
			const paragrafGroup = document.createElement("p")
			paragrafGroup.innerHTML = `${groups[i].groupName}-${groups[i].groupNumber}`

			const inputGroupPlaces = document.createElement("input")
			inputGroupPlaces.setAttribute("type", "number")
			inputGroupPlaces.setAttribute("id", groups[i].groupName + groups[i].groupNumber)
			inputGroupPlaces.setAttribute("class", "group")

			paragrafGroup.append(inputGroupPlaces)
			window.append(paragrafGroup)
		}

		//-------------------------кнопки закрыть и построить-------------------------
		const buttonCreate = document.createElement("button")
		buttonCreate.innerHTML = "Побудувати"
		buttonCreate.setAttribute("onclick", "buildPlaces(groups)")
		window.append(buttonCreate)

		const buttonClose = document.createElement("button")
		buttonClose.innerHTML = "Закрити"
		buttonClose.setAttribute("onclick", "closeWindow()")
		window.append(buttonClose)

	}
}

//-------------------------закрыть окно-------------------------
function closeWindow() {
	const window = document.querySelector(".window")
	window.remove()
}

//-------------------------построить места-------------------------
function buildPlaces(groups) {

	deleteList()

	allGroupsAndStudents(groups)

	//-------------------------получаем значения всех мест-------------------------
	const rooms = Number(document.querySelector(".rooms").value)
	const places = Number(document.querySelector(".places").value)
	const additional = Number(document.querySelector(".additional").value)

	let seats = rooms * places + additional

	//-------------------------получаем процент по группам-------------------------
	const valueGroupParcent = document.querySelectorAll(".group")
	const arrGroupParcent = []
	for (let i = 0; i < valueGroupParcent.length; i++) {
		arrGroupParcent[i] = {
			id: valueGroupParcent[i].id,
			procent: Number(valueGroupParcent[i].value)
		}
	}


	//-------------------------Переделываем массив студентов по приоритетам-------------------------

	const prioritiesGroups = []
	for (let i = 0; i < groups.length; i++) {

		let arrStudents = groups[i].students

		arrStudents.sort(function (a, b) {
			return b.prioritie - a.prioritie;
		});

		prioritiesGroups[i] = {
			id: groups[i].id,
			parcent: arrGroupParcent[i].procent,
			groupName: groups[i].groupName,
			groupNumber: groups[i].groupNumber,
			student: arrStudents
		}

	}



	//-------------------------Проверка, есть ли проценты-------------------------
	let sumParcent = 0
	for (let j = 0; j < arrGroupParcent.length; j++) {
		sumParcent += arrGroupParcent[j].procent;
	}

	//-------------------------Процентов нет-------------------------
	if (sumParcent == 0) {
		//-------------------------Подсчитываем количество людей всего-------------------------
		let people = 0;
		for (let i = 0; i < prioritiesGroups.length; i++) {
			people += prioritiesGroups[i].student.length
		}

		//-------------------------Проверка количества мест и людей-------------------------
		//-------------------------Ровно сколько людей и столько комнат-------------------------
		if (seats === people) {
			createList(2, "123", "all")
		}

		//-------------------------Остались даже комнаты-------------------------
		else if (seats > people) {
			createList(seats - people, "123", "left")
		}

		//-------------------------Не хватает мест-------------------------
		else {

			createList(people - seats, "123", "lacks")

			//-------------------------Создаем весь список всех студентов и сортируем-------------------------
			let allStudents = []
			for (let i = 0; i < prioritiesGroups.length; i++) {
				allStudents.push(prioritiesGroups[i].student)
			}
			var allStudentsSort = [].concat.apply([], allStudents);
			allStudentsSort.sort(function (a, b) {
				return b.prioritie - a.prioritie;
			});


			//-------------------------Выводим список студентов добавленных в общежитие и не добавленных-------------------------
			allStudentsSortAdd = allStudentsSort.filter((element, index) => index < allStudentsSort.length - (people - seats));
			allStudentsSortDelete = allStudentsSort.filter((element, index) => index >= allStudentsSort.length - (people - seats));

			studentsInHostel(allStudentsSortAdd, allStudentsSortDelete)
			closeWindow()

		}
	}
	//-------------------------Проценты есть-------------------------
	else {

		let newArr = []
		for (let i = 0; i < prioritiesGroups.length; i++) {
			newArr[i] = {
				parcent: prioritiesGroups[i].parcent,
				student: prioritiesGroups[i].student,
			}
		}



		//-------------------------Оставляем нужное количество студентов-------------------------
		let minusStudent = []
		for (let i = 0; i < newArr.length; i++) {
			minusStudent[i] = newArr[i].student.slice(0, newArr[i].parcent);
		}


		//-------------------------Делаем целый список-------------------------
		let allStudents = [].concat.apply([], minusStudent);

		//-------------------------По приоритетам-------------------------
		allStudents.sort(function (a, b) {
			return b.prioritie - a.prioritie;
		});

		//-------------------------Условия-------------------------
		if (seats === allStudents.length) {
			createList(2, "123", "all")
		}
		else if (seats > allStudents.length) {
			createList(seats - allStudents.length, "123", "left")

		}
		else {
			createList(allStudents.length - seats, "123", "lacks")
			//-------------------------Выводим список студентов добавленных в общежитие и не добавленных-------------------------
			allStudentsSortAdd = allStudents.filter((element, index) => index < allStudents.length - (allStudents.length - seats));
			allStudentsSortDelete = allStudents.filter((element, index) => index >= allStudents.length - (allStudents.length - seats));
			studentsInHostel(allStudentsSortAdd, allStudentsSortDelete)
		}
	}
	closeWindow()
}

//-------------------------создаем список всех студентов-------------------------
function allGroupsAndStudents(groups) {

	const groupList = document.querySelector(".group-list")
	if (groupList) groupList.remove()


	const list = document.createElement("div")
	list.setAttribute("id", "list")
	container.append(list)

	const divGroupList = document.createElement("div")
	divGroupList.className = "group-list"
	divGroupList.innerHTML = "<h2>Список всіх студентів</h2>"
	divGroupList.style.alignItems = "center"
	list.append(divGroupList)

	for (let i = 0; i < groups.length; i++) {
		const nameGroup = document.createElement("h3")
		nameGroup.innerHTML = `${groups[i].groupName} - ${groups[i].groupNumber}`
		nameGroup.style.marginTop = "30px"
		divGroupList.append(nameGroup)

		for (let j = 0; j < groups[i].students.length; j++) {
			const student = document.createElement("p")
			student.style.marginLeft = "30px"
			student.innerHTML = `	${j + 1}. ${groups[i].students[j].name}, пріорітет: ${groups[i].students[j].prioritie};`
			divGroupList.append(student)
		}
	}
	addStudent()
}

//-------------------------очистить поля со списками студентов-------------------------
function deleteList() {
	const list = document.getElementById("list")
	if (list) list.remove()
}

//-------------------------Сообщение про заселение людей-------------------------
function createList(vacancies, list, type) {

	const divList = document.getElementById("list")

	const message = document.createElement("div")
	message.className = "message"

	if (type == "all") {
		message.style.background = "rgb(238, 207, 69)"
		message.innerHTML = "<h2>Всі студенти заселені, немає вільних місць</h2>"
		divList.append(message)
	}
	else if (type == "left") {
		message.style.background = "rgb(81, 219, 111)"
		message.innerHTML = `<h2>Всі студенти заселені, залишились вільні місця:${vacancies}</h2>`
		divList.append(message)
	}
	else {
		message.style.background = "rgb(182, 65, 65)"
		message.innerHTML = `<h2>Не всі студенти заселені! не вистачає:${vacancies} місць</h2>`
		divList.append(message)
	}
}

//-------------------------Список заселенных студентов-------------------------
function studentsInHostel(addStudents, deleteStudents) {
	var massiv1 = addStudents;
	var blob = new Blob([JSON.stringify(massiv1)], { type: "text/javascript" });
	var link = document.createElement("a");
	link.setAttribute("href", URL.createObjectURL(blob));
	link.setAttribute("download", "Заселені.txt");
	link.click();

	var massiv2 = deleteStudents;
	var blob1 = new Blob([JSON.stringify(massiv2)], { type: "text/javascript" });
	var link1 = document.createElement("a");
	link1.setAttribute("href", URL.createObjectURL(blob1));
	link1.setAttribute("download", "Не-заселені.txt");
	link1.click();



	const divList = document.getElementById("list")

	//-------------------------Блок для списков-------------------------
	const divListInHostel = document.createElement("div")
	divListInHostel.className = "students-in-hostel"
	divList.append(divListInHostel)

	//-------------------------Добавленные в общежитие-------------------------
	const divTitleAdd = document.createElement("h2")
	divTitleAdd.innerHTML = "Студенти вписані в гуртожиток:"
	divTitleAdd.className = "add"

	divListInHostel.append(divTitleAdd)

	for (let i = 0; i < addStudents.length; i++) {
		const paragrafAdd = document.createElement("p")
		paragrafAdd.innerHTML = `${i + 1}. ${addStudents[i].name}, пріорітет:${addStudents[i].prioritie}`
		divListInHostel.append(paragrafAdd)
	}

	//-------------------------Не добавленные в общежитие-------------------------
	const divTitleDelete = document.createElement("h2")
	divTitleDelete.className = "delete"
	divTitleDelete.innerHTML = "Студенти не вписані в гуртожиток.<br> В черзі:"

	divListInHostel.append(divTitleDelete)

	for (let i = 0; i < deleteStudents.length; i++) {
		const paragrafDelete = document.createElement("p")
		paragrafDelete.innerHTML = `${i + 1}. ${deleteStudents[i].name}, пріорітет:${deleteStudents[i].prioritie}`
		divListInHostel.append(paragrafDelete)
	}



}

//------------------------Создаем кнопки по создатию---------------------------
function addStudent() {
	const groupListDiv = document.querySelector(".group-list")

	const divAddStudent = document.createElement("div")
	divAddStudent.className = "addStudentDiv"

	const inerAddName = document.createElement("input")
	inerAddName.className = "name-Studen"
	inerAddName.setAttribute("placeholder", "Ім'я та призвище")

	const inerAddValue = document.createElement("input")
	inerAddValue.className = "value-Studen"
	inerAddValue.setAttribute("placeholder", "Пріорітет")
	inerAddValue.setAttribute("type", "number")



	const buttonAddStudent = document.createElement("button")
	buttonAddStudent.className = "button-add-student"
	buttonAddStudent.innerHTML = "Додати студента"
	buttonAddStudent.setAttribute("onclick", "addStudentArr(groups)")


	divAddStudent.append(inerAddName)
	divAddStudent.append(inerAddValue)
	divAddStudent.append(buttonAddStudent)


	groupListDiv.append(divAddStudent)

}


//------------------------Добавляем студента в массив---------------------------
function addStudentArr(groups) {
	const nameS = document.querySelector(".name-Studen").value

	const valueS = document.querySelector(".value-Studen").value

	let time = new Date().toLocaleTimeString()

	if (nameS && valueS) {
		const j = groups[0].students.length
		groups[0].students[j] = {
			name: time + ` Додатковий студент: ${nameS}`,
			prioritie: Number(valueS)
		}
		allGroupsAndStudents(groups)
	} else {
		alert("Введіть коректні значення")
	}





}