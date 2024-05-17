import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleDeleteQuestion = async (id) => {
    console.log("???????????????????????????????///")
    console.log({id})
    console.log("???????????????????????????????///")

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          setQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question.id !== id)
          );
        } else {
          console.error("Failed to delete question. Status code: " + response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDeleteQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;