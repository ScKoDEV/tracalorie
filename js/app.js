class CalorieTracker {
        #calorieLimit = 2000; 
        #totalCalories = 0;
        #meals = [];
        #workouts = [];

        addMeal(meal) {
            this.#meals.push(meal);
            this.#totalCalories += meal.calories;
        }

        addWorkout(workout) {
            this.#workouts.push(workout);
            this.#totalCalories += workout.calories;
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

tracker.addMeal(breakfast);
const run = new Workout('Morning Run', 300);

tracker.addWorkout(run);

