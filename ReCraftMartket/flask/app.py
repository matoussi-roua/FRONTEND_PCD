# -*- coding: utf-8 -*-
"""5.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1DE3_qFbZHvkaEkMNFeuGscQGC2wI9Nt5
"""

#pip install pyspark/flask

from flask import Flask, request
from pyspark.sql import SparkSession
from pyspark.ml.recommendation import ALS
import pandas as pd
#import mysql.connector


app = Flask(__name__)

# Initialize SparkSession
spark = SparkSession.builder \
    .appName("Recommendation System") \
    .getOrCreate()

# Load pre-trained ALS model
model_path = "C:\Users\rouam\Desktop\pcd\PCD2ndYear\ReCraftMartket\flask\trainedmodel.py"
model = ALSModel.load(model_path)

# Define weights for different interactions
weights = {
    'likes': 0.4,
    'comments': 0.1,
    'shop_points': 0.3,
    'wishlist': 0.2
}
# Configure MySQL connection properties
mysql_properties = {
    "driver": "com.mysql.jdbc.Driver",
    "url": "jdbc:mysql://localhost:3306/backend",
    "user": "root",
    "password": "14278342",
}

# Query to select user-item interaction data from MySQL table
query = """
    (SELECT userId, postId, interactionScore FROM interaction)
    AS interaction_data
"""

# Load data from MySQL into DataFrame
input_data = spark.read.jdbc(url=mysql_properties['url'], table=query, properties=mysql_properties)

# Print the schema of the input data
#input_data.printSchema()

# Show the first few rows of the input data
#input_data.show()


# Load trained ALS model
als = ALS(maxIter=5, regParam=0.01,
          userCol="userId", itemCol="postId", ratingCol="interactionScore",
          coldStartStrategy="drop")
model = als.fit(input_data)

@app.route('/', methods=['POST'])
def register_interaction():
    # Receive user interaction data from the request
    data = request.json

    # Calculate interaction score based on user interactions
    interaction_score = data['liked'] * weights['likes'] + \
                        data['commented'] * weights['comments'] + \
                        data['wishlist'] * weights['wishlist'] + \
                        data['shopPoints'] * weights['shop_points']


     # Use the pre-trained ALS model to make recommendations
    recommendations = model.recommendForAllUsers(10)

    # Insert the interaction data into the MySQL database
    sql = "INSERT INTO interactions (userId, postId, interactionScore) VALUES (%s, %s, %s)"
    val = (data['userId'], data['postId'], interaction_score)
  #  cursor.execute(sql, val)
  #  conn.commit()

    return 'Interaction registered successfully'

if __name__ == '__main__':
    app.run(debug=True)