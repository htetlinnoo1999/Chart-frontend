import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { saveRecord } from "../chartApi";

function InsertForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(0);

  const queryClient = useQueryClient();
  const clearStates = () => {
    setName("");
    setAge("");
    setGender("");
  }
  const submit = () => {
    saveRecord({ name, age, gender }).then((res) => {
      if (res.status === "created") {
        queryClient.invalidateQueries("bar");
        queryClient.invalidateQueries("pie");
        clearStates()
      }
    });
  };

  return (
    <div className="container width-75">
      <Form id="insert_form">
        <Form.Group className="mb-3" controlId="formText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="Eg. John Wick"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNumber">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={age}
            placeholder="Eg. 32"
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>

        <div key={`inline-radio`} className="mb-3">
          <Form.Check
            inline
            label="Female"
            name="gender"
            type="radio"
            value="0"
            id={`inline-radio-1`}
            onChange={(e) => setGender(e.target.value)}
          />
          <Form.Check
            inline
            label="Male"
            name="gender"
            type="radio"
            value="1"
            id={`inline-radio-2`}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <Button variant="outline-success" onClick={submit}>
          Save
        </Button>
      </Form>
    </div>
  );
}

export default InsertForm;
