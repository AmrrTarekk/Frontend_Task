import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useEmp from "../../hooks/useEmp";

function EmpCards() {
  const { filteredEmployee, employees, setEmployees } = useEmp();

  console.log("Fe eh filter", filteredEmployee);
  // const handleClose = (id) => {
  //   console.log(movies, id);
  //   setMovies(() => {
  //     return movies.filter((movie) => movie.id !== id);
  //   });
  // };
  return (
    <div className="d-flex flex-wrap gap-3">
      {filteredEmployee.map((emp) => (
        <Card style={{ width: "18rem" }} key={emp.id}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>{emp.name}</Card.Title>
            <Card.Text>
              phone: {emp.phone} email: {emp.email} dep: {emp.department} pos:{" "}
              {emp.position}
              year: {emp.year} month: {emp.month} day: {emp.day}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default EmpCards;
