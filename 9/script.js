
document.addEventListener('DOMContentLoaded', () => {
    const carForm = document.getElementById('car-form');
    const carList = document.getElementById('car-list');
    
    let cars = [];

    function renderCars() {
        carList.innerHTML = '';
        cars.forEach((car, index) => {
            const carItem = document.createElement('div');
            carItem.className = 'car-item';
            carItem.innerHTML = `
                <span>\${car.make} \${car.model} (\${car.year})</span>
                <div>
                    <button onclick="editCar(\${index})">Edit</button>
                    <button onclick="deleteCar(\${index})">Delete</button>
                </div>
            `;
            carList.appendChild(carItem);
        });
    }

    function addCar(car) {
        cars.push(car);
        renderCars();
    }

    function deleteCar(index) {
        cars.splice(index, 1);
        renderCars();
    }

    function editCar(index) {
        const car = cars[index];
        document.getElementById('make').value = car.make;
        document.getElementById('model').value = car.model;
        document.getElementById('year').value = car.year;
        carForm.removeEventListener('submit', handleSubmit);
        carForm.addEventListener('submit', function handleEdit(event) {
            event.preventDefault();
            car.make = document.getElementById('make').value;
            car.model = document.getElementById('model').value;
            car.year = document.getElementById('year').value;
            renderCars();
            carForm.removeEventListener('submit', handleEdit);
            carForm.addEventListener('submit', handleSubmit);
            carForm.reset();
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newCar = {
            make: document.getElementById('make').value,
            model: document.getElementById('model').value,
            year: document.getElementById('year').value
        };
        addCar(newCar);
        carForm.reset();
    }

    carForm.addEventListener('submit', handleSubmit);

    window.deleteCar = deleteCar;
    window.editCar = editCar;
});
