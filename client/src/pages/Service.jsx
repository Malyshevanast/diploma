/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./service.css";
import { getServices } from "../api/service";
import ServiceCard from "../components/ServiceCard";

const Service = () => {
  const [serviceList, setServiceList] = useState([]);

  const getServicesList = async () => {
    try {
      const { success, services } = await getServices();
      if (!success) {
        alert("hello");
        return;
      }

      setServiceList(services);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getServicesList();
  }, []);

  return (
    <Container>
      {serviceList.length === 0 ? (
        <h1 className="my-5">Тарифы отсутствуют</h1>
      ) : (
        <Row xs={1} md={2} className="d-flex justify-content-center align-items-center my-3 g-4">
          {serviceList &&
            serviceList.map((service, index) => (
              <Col xs={12} md={6} key={index + 1}>
                <ServiceCard service={service} reloadList={getServicesList} />
              </Col>
            ))}
        </Row>
      )}
    </Container>
  );
};

export default Service;
