from flask import Flask, render_template, request
import joblib
import numpy as np
import os

app = Flask(__name__)

# --------------------------------------------------
# Load Trained Model
# --------------------------------------------------

MODEL_PATH = os.path.join("models", "RFC_model.pkl")

model = joblib.load(MODEL_PATH)


# --------------------------------------------------
# Home Page
# --------------------------------------------------

@app.route("/")
def home():
    return render_template("index.html")


# --------------------------------------------------
# Analysis Page
# --------------------------------------------------

@app.route("/analysis")
def analysis():
    return render_template("analysis.html")


# --------------------------------------------------
# Prediction Page
# --------------------------------------------------

@app.route("/prediction")
def prediction():
    return render_template("prediction.html")


# --------------------------------------------------
# Prediction Function
# --------------------------------------------------

@app.route("/predict", methods=["POST"])
def predict():

    try:

        age = float(request.form["Age"])
        gender = float(request.form["Gender"])
        hormonal_changes = float(request.form["HormonalChanges"])
        family_history = float(request.form["FamilyHistory"])
        race = float(request.form["RaceEthnicity"])
        body_weight = float(request.form["BodyWeight"])
        calcium = float(request.form["CalciumIntake"])
        vitamin_d = float(request.form["VitaminDIntake"])
        physical_activity = float(request.form["PhysicalActivity"])
        smoking = float(request.form["Smoking"])
        alcohol = float(request.form["AlcoholConsumption"])
        medical_conditions = float(request.form["MedicalConditions"])
        medications = float(request.form["Medications"])
        prior_fractures = float(request.form["PriorFractures"])

        features = np.array([[
            age,
            gender,
            hormonal_changes,
            family_history,
            race,
            body_weight,
            calcium,
            vitamin_d,
            physical_activity,
            smoking,
            alcohol,
            medical_conditions,
            medications,
            prior_fractures
        ]])

        prediction = model.predict(features)[0]

        # Predict probabilities
        proba = model.predict_proba(features)[0]

        # Assuming:
        # Class 0 = Low Risk
        # Class 1 = High Risk

        low_probability = round(proba[0] * 100, 2)
        high_probability = round(proba[1] * 100, 2)

        # Confidence of predicted class
        confidence = round(max(proba) * 100, 2)

        if prediction == 1:

            result = "High Risk"

            color = "danger"

            recommendation = [
                "Consult an Orthopedic Specialist.",
                "Increase Calcium Intake.",
                "Maintain Vitamin D Levels.",
                "Perform Weight-Bearing Exercises.",
                "Avoid Smoking and Alcohol."
            ]

        else:

            result = "Low Risk"

            color = "success"

            recommendation = [
                "Continue Healthy Lifestyle.",
                "Maintain Regular Exercise.",
                "Eat Calcium Rich Foods.",
                "Get Regular Health Checkups."
            ]

        return render_template(
            "result.html",
            prediction=result,
            probability=confidence,          # Confidence of predicted class
            low_probability=low_probability, # Probability of Low Risk
            high_probability=high_probability, # Probability of High Risk
            color=color,
            recommendation=recommendation
        )

    except Exception as e:

        return render_template(
            "result.html",
            prediction="Prediction Failed",
            probability=0,
            low_probability=0,
            high_probability=0,
            color="warning",
            recommendation=[str(e)]
        )

# --------------------------------------------------
# Error Page
# --------------------------------------------------

@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html"), 404


# --------------------------------------------------
# Run Flask
# --------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)