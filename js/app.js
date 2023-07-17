class CalorieTracker {

        // With private properties we do not need a constructor anymore but if we would like to trigger some private methods we have to use this.
        constructor(){
            this.#displayCaloriesTotal();
            this.#displayCaloriesLimit(); 
            this.#displayCaloriesConsumed();
            this.#displayCaloriesBurned();
            this.#displayCaloriesRemaining();
        }

        #calorieLimit = 2000; 
        #totalCalories = 0;
        #meals = [];
        #workouts = [];

        // Public Methods/API //

        addMeal(meal) {
            this.#meals.push(meal);
            this.#totalCalories += meal.calories;
            this.#render();
        }

        addWorkout(workout) {
            this.#workouts.push(workout);
            this.#totalCalories -= workout.calories;
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

            const remaining = this.#calorieLimit - this.#totalCalories;

            caloriesRemainingEl.innerHTML = remaining;
        }

        // We have to do the rendering everytime we change the dom so we call this method //
        #render(){
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

const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 400);
const lunch = new Meal('Lunch', 350);

tracker.addMeal(breakfast);
tracker.addMeal(lunch);
const run = new Workout('Morning Run', 320);

tracker.addWorkout(run);




