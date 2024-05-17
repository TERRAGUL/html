class Car {
    constructor(name, model, year) {
        this.name = name;
        this.model = model;
        this.year = year;
    }
}

document.getElementById('addCarForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addCar();
});

let cars = [];

function addCar() {
    const name = document.getElementById('carName').value;
    const model = document.getElementById('carModel').value;
    const year = document.getElementById('carYear').value;

    if (validateCar(name, model, year)) {
        const car = new Car(name, model, parseInt(year));
        cars.push(car);
        renderCars();
        document.getElementById('addCarForm').reset();
    }
}

function validateCar(name, model, year) {
    if (!name || !model || !year) {
        alert('All fields are required!');
        return false;
    }
    if (isNaN(year) || year <= 0) {
        alert('Year must be a positive number!');
        return false;
    }
    return true;
}

function renderCars() {
    const carList = document.getElementById('cars');
    carList.innerHTML = '';
    cars.forEach((car, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>${car.name} - ${car.model} (${car.year})</div>
                <div>
                    <button class="btn btn-sm btn-warning" onclick="editCar(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCar(${index})">Delete</button>
                </div>
            </div>
        `;
        carList.appendChild(li);
    });
}

function editCar(index) {
    const car = cars[index];
    document.getElementById('carName').value = car.name;
    document.getElementById('carModel').value = car.model;
    document.getElementById('carYear').value = car.year;
    document.getElementById('addCarForm').onsubmit = function(event) {
        event.preventDefault();
        updateCar(index);
    }
}

function updateCar(index) {
    const name = document.getElementById('carName').value;
    const model = document.getElementById('carModel').value;
    const year = document.getElementById('carYear').value;

    if (validateCar(name, model, year)) {
        cars[index].name = name;
        cars[index].model = model;
        cars[index].year = parseInt(year);
        renderCars();
        document.getElementById('addCarForm').reset();
        document.getElementById('addCarForm').onsubmit = function(event) {
            event.preventDefault();
            addCar();
        }
    }
}

function deleteCar(index) {
    cars.splice(index, 1);
    renderCars();
}
