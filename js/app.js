class CalorieTracker {

        // With private properties we do not need a constructor anymore but if we would like to trigger some private methods we have to use this.
        constructor(){
            this.#displayCaloriesTotal();
            this.#displayCaloriesLimit(); 
            this.#displayCaloriesConsumed();
            this.#displayCaloriesBurned();
            this.#displayCaloriesRemaining();
            this.#displayCaloriesProgress();
        }

        #calorieLimit = 2000; 
        #totalCalories = 0;
        #meals = [];
        #workouts = [];

        // Public Methods/API //

        addMeal(meal) {
            this.#meals.push(meal);
            this.#totalCalories += meal.calories;
            this.#displayNewMeal(meal);
            this.#render();
        }

        addWorkout(workout) {
            this.#workouts.push(workout);
            this.#totalCalories -= workout.calories;
            this.#displayNewWorkout(workout);
            this.#render();
        }
        
        // Private Methods //

        #displayCaloriesTotal(){
            const totalCaloriesEl = document.getElementById('calories-total');
            totalCaloriesEl.innerHTML = this.#totalCalories;
        }

        #displayCaloriesLimit(){
            const calorieLimitEl = document.getElementById('calories-limit');
            calorieLimitEl.innerHTML = this.#calorieLimit;
        }

        #displayCaloriesConsumed(){
            const caloriesConsumedEl = document.getElementById('calories-consumed');

            const consumed = this.#meals.reduce((total, meal) => total + meal.calories, 0);

            caloriesConsumedEl.innerHTML = consumed;
        }

        #displayCaloriesBurned(){
            const caloriesBurnedEl = document.getElementById('calories-burned');

            const burned = this.#workouts.reduce((total, workout) => total + workout.calories, 0);

            caloriesBurnedEl.innerHTML = burned;
        }

        #displayCaloriesRemaining(){
            const caloriesRemainingEl = document.getElementById('calories-remaining');
            const progressEl = document.getElementById('calorie-progress');

            const remaining = this.#calorieLimit - this.#totalCalories;

            caloriesRemainingEl.innerHTML = remaining
            
            if (remaining <= 0) {
                caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
                caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
                progressEl.classList.remove('bg-success');
                progressEl.classList.add('bg-danger');
            } else {
                caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
                caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
                progressEl.classList.add('bg-success');
                progressEl.classList.remove('bg-danger');
            }
        }

        #displayCaloriesProgress(){
            const progressEl = document.getElementById('calorie-progress');
            const percentage = (this.#totalCalories / this.#calorieLimit)*100;
            const width = Math.min(percentage,100);
            progressEl.style.width = `${width}%`;
        }

        #displayNewMeal(meal){
            const mealsEl = document.getElementById('meal-items');
            const mealEl = document.createElement('div');
            mealEl.classList.add('card', 'my-2');
            mealEl.setAttribute('data-id', meal.id);
            mealEl.innerHTML = `
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${meal.name}</h4>
                <div
                  class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                >
                  ${meal.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div> 
            `;

            mealsEl.appendChild(mealEl);
        }

        #displayNewWorkout(workout){
            const workoutsEl = document.getElementById('workout-items');
            const workoutEl = document.createElement('div');
            workoutEl.classList.add('card', 'my-2');
            workoutEl.setAttribute('data-id', workout.id);
            workoutEl.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mx-1">${workout.name}</h4>
                        <div
                            class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                        >
                        ${workout.calories}
                        </div>
                        <button class="delete btn btn-danger btn-sm mx-2">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                </div>
            </div>
            `;

            workoutsEl.appendChild(workoutEl);
        }

        // We have to do the rendering everytime we change the dom so we call this method //
        #render(){
            this.#displayCaloriesProgress();
            this.#displayCaloriesTotal();
            this.#displayCaloriesConsumed();
            this.#displayCaloriesBurned();
            this.#displayCaloriesRemaining();
        }

    }

class Meal {
    constructor(name, calories){
        this.id = Math.random().toString(16).slice(2); //this is not optimal solution for id as there still could be duplicates, usually db deals with id creation but we are front end only, better solution would be crypto api - crypto.randomUUID(), only works on localhost and https, another one could be datetimestamp
        this.name = name;
        this.calories = calories;
    }
}

class Workout {
    constructor(name, calories){
        this.id = Math.random().toString(16).slice(2); 
        this.name = name;
        this.calories = calories;
    }
}

class App {
    constructor(){
    
        document.getElementById('meal-form').addEventListener('submit', this.#newItem.bind(this, 'meal')); //we need to bind this so we dont lose our app context
        document.getElementById('workout-form').addEventListener('submit', this.#newItem.bind(this, 'workout'));
    }

    #tracker = new CalorieTracker();

    #newItem(type, e){
        e.preventDefault();

        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);

        // Validate Input
        if (name.value === '' || calories.value === ''){
            alert('Please fill in all fields!');
            return;
        } else if (name.value === 'Test' || name.value === 'test' ){
            alert('Hier wird nichts getestet! Alles professionell erstellt!');
            return;
        }

        if (type === 'meal'){
        const meal = new Meal(name.value, +calories.value); // calories need to be parsed to number -> add the +

        this.#tracker.addMeal(meal);

        } else {
            const workout = new Workout(name.value, +calories.value);

            this.#tracker.addWorkout(workout);
        }
        name.value = '';
        calories.value = '';


        const collapseItem = document.getElementById(`collapse-${type}`);
        const bsCollapse = new bootstrap.Collapse(collapseItem, {
            toggle: true
        })

    }

}

const app = new App();




