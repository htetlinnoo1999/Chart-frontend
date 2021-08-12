import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { saveRecord } from "../chartApi";

function InsertForm(props) {
  const empty = {
    name: "",
    age: "",
    gender: "",
  };
  const [fields, setFields] = useState(() => empty);
  const queryClient = useQueryClient();
  const { isError, error, mutate } = useMutation(saveRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries("bar");
      queryClient.invalidateQueries("pie");
      props.setPage("bar");
    },
  });

  //fields update function
  const updateFields = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  //clear data after save record
  const clearStates = () => {
    setFields(empty);
  };

  const submit = (event) => {
    event.preventDefault();

    mutate(fields);
  };
  if (isError) return <h1> Something went wrong. Error: {error.message}</h1>;
  return (
    <div className="container width-75">
      <Form id="insert_form">
        <Form.Group className="mb-3" controlId="formText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={fields.name}
            placeholder="Eg. John Wick"
            onChange={updateFields}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNumber">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={fields.age}
            placeholder="Eg. 32"
            onChange={updateFields}
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
            onChange={updateFields}
          />
          <Form.Check
            inline
            label="Male"
            name="gender"
            type="radio"
            value="1"
            id={`inline-radio-2`}
            onChange={updateFields}
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
