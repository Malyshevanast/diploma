/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
// import { Link } from "react-router-dom";
import { getServices } from "../api/service";
import { getUserData } from "../api/user";
import useToken from "../hooks/useToken";
import "./service.css";

const Service = () => {
  const { loggedIn } = useToken();
  const [serviceList, setServiceList] = useState();
  // eslint-disable-next-line no-unused-vars
  const [role, setRole] = useState("user");

  const serviceTableHead = ["Описание", "Стоимость"];

  const getServicesList = async () => {
    const { success, services, message } = await getServices();
    if (!success) {
      alert(message);
      return;
    }

    setServiceList(services);
  };

  const getRole = async () => {
    const { success, user } = await getUserData();
    if (!success) {
      return;
    }

    setRole(user.role);
  };

  useEffect(() => {
    if (loggedIn) {
      getRole();
    }
    getServicesList();
  }, []);

  return (
    <Container className="d-flex justify-content-center">
      <Card className="my-5" style={{ width: "50rem", borderRadius: 5 }}>
        <Card.Body>
          <Card.Title align="center">Тарифы</Card.Title>
          <Card.Text>
            <Table responsive="sm" hover striped title="Тарифы">
              <thead>
                <tr>
                  <th />
                  {serviceList &&
                    serviceList.map((service) => <th key={service.id}>{service.name}</th>)}
                </tr>
              </thead>

              <tbody>
                <tr align="center">
                  {serviceTableHead.map(
                    (head, index) => index % 2 === 0 && <th key={index}>{head}</th>
                  )}
                  {serviceList &&
                    serviceList.map((service) => <td key={service.id}>{service.description}</td>)}
                </tr>
                <tr align="center">
                  {serviceTableHead.map(
                    (head, index) => index % 2 !== 0 && <th key={index}>{head}</th>
                  )}
                  {serviceList &&
                    serviceList.map((service) => (
                      <td key={service.id}>
                        {new Intl.NumberFormat("ru-RU", {
                          style: "currency",
                          currency: "RUB",
                        }).format(service.price)}
                      </td>
                    ))}
                </tr>
              </tbody>
            </Table>

            <table />
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Service;

// {serviceList && serviceList.length > 0 ? (
//   <>
//     <thead>
//       <th className="w-100">category</th>
//     </thead>
//     <tbody>
//       {serviceList &&
//         serviceList.map((service, index) => (
//           <tr key={index}>
//             <td className="naz">{service.name}</td>
//             <td align="right">{service.price}&#8381;</td>
//             {role && role === "admin" && (
//               <>
//                 <td align="center">
//                   <Button type="submit" variant="info" href="/record">
//                     Изменить
//                   </Button>
//                 </td>
//                 <td align="center">
//                   <Button type="submit" variant="info">
//                     Удалить
//                   </Button>
//                 </td>
//               </>
//             )}
//           </tr>
//         ))}
//     </tbody>
//   </>
// ) : (
//   <h1>Список пуст</h1>
// )}
// {serviceList && role && role !== "admin" ? (
//   <Button as={Link} to="/record" variant="info">
//     Записаться
//   </Button>
// ) : null}
