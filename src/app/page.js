'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [syllabus, setSyllabus] = useState('');
  const [questions, setQuestions] = useState('');
  const [predictions, setPredictions] = useState([]);

  const demoSyllabus = `1 
Introduction: Artificial Intelligence, Application of 
AI, AI Problems, Problem Formulation, Intelligent 
Agents, Types of Agents, Agent Environments, PEAS 
representation for an Agent, Architecture of Intelligent 
Agents.  
Syntax & Semantic for Propositional logic, Syntax & 
Semantic for First Order Predicate Logic, Properties 
for Well-Formed Formula (WFF), Resolution: 
Resolution Basics, Conversion to clausal form, 
Resolution of proposition logic, Unification of 
predicates. 
Self-Study Topics:  Expert systems 
6 CO1 2,3 
2 
Search Strategies: Solving problems by searching, 
Search- Issues in the Design of Search Programs, Un
Informed Search- BFS, DFS; Informed Search 
(Heuristic Search Techniques) - Generate-And- Test, 
Hill Climbing, Best-First Search, A* Algorithm, 
Alpha-beta search algorithm, Problem Reduction, 
AO*Algorithm, Constraint Satisfaction, Means-Ends 
Analysis 
Self-Study Topics: Tabu search 
8 CO2 1,2,3 
3 
Neural Networks: Neural Networks- Introduction to 
Neural Networks, Model of Artificial Neuron, 
Learning rules, and various activation functions.  
Perceptron Networks, Adaline, Multilayer Perceptrons, 
Optimization algorithm- Gradient decent, Tuning the 
Network Size  
Self-Study Topics: Maxnet algorithm   
6 CO3 1,2, 
4,6 
4 
Introduction to Machine Learning: Introduction. 
Motivation and role of machine learning in computer 
science and problem-solving, Different types of 
learning, Hypothesis space and inductive bias, 
Training and test sets, cross-validation, Evaluation 
Confusion Matrix, Precision, Recall Bias and 
Variance, Concept of overfitting, underfitting, 
Parameters, Hyper parameters 
Feature Selection: forward search, backward search, 
univariate, multivariate feature selection approach, 
Feature reduction (Principal Component Analysis) 
Supervised Learning and Unsupervised Learning, 
Introduction to reinforcement learning 
Self-Study Topics: Density Based Clustering, K
medoid, Feature selection – feature ranking and subset 
selection 
6 CO4 7,8,9, 
11,12 
5 
Forecasting and Learning Theory: 
Regression: Non-linear regression, Logistic regression, 
Probability and Bayes Learning: Bayesian Learning, 
Naïve Bayes,  Bayesian Belief  networks, Introduction, 
Optimal Separating Hyperplane, Separating data with 
8 CO5 7,8, 
9,10 
 
82 
 
maximum margin, Support Vector Machine (SVM), 
Finding the maximum margin, The Non-Separable 
Case: Soft Margin Hyperplane, Kernel Trick, Defining 
Kernels   
Clustering: Expectation – Maximization Algorithm, 
Supervised Learning after Clustering, Choosing the 
number of clusters Bias/variance tradeoff, Tuning 
Model Complexity 
Self-Study Topics: Maximum Likelihood Estimation 
6 
Ensemble Methods: Mixture Models, Classifier using 
multiple samples of the data set, Random forest, 
Improving classifier by focusing on error, weak 
learner with a decision stump, Bagging, Stacking, 
Boosting, AdaBoost algorithm, Classifying with 
AdaBoost Bootstrapping and cross-validation. 
Self-Study Topics: SMO Algorithm 
6 CO6 7,10`;

  const demoQuestions = `Discuss simple and model-based reflex agents with suitable diagram
Discuss in detail the term regression and define logistic regression.
What is the principles component analysis? Explain in detail
What are the different types of Agents? Explain PEAS representation of an agent
Discuss the various search strategies and explain the uninformed search
What is the inference in first order logic? Explain with suitable example
What is the application of machine learning? Explain supervised learning
Describe in detail the bayesian belief network with an example
Compare feature extraction and feature selection techniques.
Discuss in detail Grouping unlabeled items using k-means clustering with the help of a suitable example
Explain Decision Tree classifier. How does information gain help in determining the best attribute to split on
What is Propositional logic and First order logic in AI? Discuss with suitable examples.`;

  const fillDemoSyllabus = () => {
    setSyllabus(demoSyllabus);
  };

  const fillDemoQuestions = () => {
    setQuestions(demoQuestions);
  };

  const url =
    process.env.NODE_ENV == 'production'
      ? process.env.NEXT_PUBLIC_API_URL
      : 'http://localhost:5000';

  const processSyllabus = async () => {
    if (!syllabus.trim()) {
      alert('⚠️ Please paste the syllabus text before submitting.');
      return;
    }

    try {
      const response = await axios.post(`${url}/process-syllabus`, {
        text: syllabus,
      });

      if (response.data?.message) {
        alert(`✅ ${response.data.message}`);
      } else {
        alert('⚠️ Something went wrong. Please check the syllabus format.');
      }
    } catch (error) {
      console.error(error);
      alert('❌ Failed to process syllabus. Please try again later.');
    }
  };

  const trainModel = async () => {
    await axios.post(`${url}/train-model`);
    alert('Model trained successfully!');
  };

  const predictQuestions = async () => {
    const qList = questions
      .split('\n')
      .map((q) => q.trim())
      .filter((q) => q !== '');

    if (qList.length === 0) {
      alert('⚠️ Please enter at least one question.');
      return;
    }

    try {
      const res = await axios.post(`${url}/predict`, {
        questions: qList,
      });

      // Group by predicted unit
      const grouped = res.data.reduce((acc, item) => {
        if (!acc[item.predicted_unit]) acc[item.predicted_unit] = [];
        acc[item.predicted_unit].push(item.question);
        return acc;
      }, {});

      setPredictions(grouped);
    } catch (error) {
      console.error('Prediction Error:', error);
      alert(
        '❌ Failed to predict units. Please check your questions and try again.'
      );
    }
  };

  return (
    <main className='p-6 space-y-6 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold'>Unit Predictor</h1>

      {/* Step 1: Raw Syllabus */}
      <section>
        <h2 className='text-xl font-semibold'>Step 1: Paste Raw Syllabus</h2>
        <textarea
          rows={10}
          className='w-full p-3 border rounded mt-2'
          placeholder='Paste syllabus text here...'
          value={syllabus}
          onChange={(e) => setSyllabus(e.target.value)}
        />
        <button
          className='mt-2 px-4 py-2 bg-blue-600 rounded font-bold'
          onClick={processSyllabus}
        >
          Process Syllabus
        </button>
        <button
          className='mt-2 ml-2 px-4 py-2 bg-gray-600 rounded font-bold'
          onClick={fillDemoSyllabus}
        >
          Demo Syllabus
        </button>
      </section>

      {/* Step 2: Train Model */}
      <section>
        <h2 className='text-xl font-semibold'>Step 2: Train the Model</h2>
        <button
          className='mt-2 px-4 py-2 bg-green-600 rounded'
          onClick={trainModel}
        >
          Train Model
        </button>
      </section>

      {/* Step 3: Predict Questions */}
      <section>
        <h2 className='text-xl font-semibold'>
          Step 3: Predict Unit for Questions
        </h2>
        <textarea
          rows={6}
          className='w-full p-3 border rounded mt-2'
          placeholder='Type your questions here, one per line...'
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
        />
        <button
          className='mt-2 px-4 py-2 bg-purple-600 rounded font-bold'
          onClick={predictQuestions}
        >
          Predict Units
        </button>
        <button
          className='mt-2 ml-2 px-4 py-2 bg-gray-600 rounded font-bold'
          onClick={fillDemoQuestions}
        >
          Demo Questions
        </button>

        {/* Output */}
        {Object.keys(predictions).length > 0 && (
          <div className='mt-4 space-y-4'>
            <h3 className='font-semibold text-lg'>
              Predictions (Grouped by Unit):
            </h3>
            {Object.entries(predictions).map(([unit, questions]) => (
              <div key={unit} className='border p-4 rounded shadow'>
                <h4 className='text-blue-600 font-bold mb-2'>📦 Unit {unit}</h4>
                <ul className='list-disc list-inside'>
                  {questions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
      <pre className='text-sm mt-10 text-center'>
        *The predictions may not be 100% accurate
      </pre>
    </main>
  );
}
