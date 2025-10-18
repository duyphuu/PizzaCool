import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Promo() {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/magiamgia")
      .then((res) => res.json())
      .then((data) => setPromos(data))
      .catch((err) => console.error("Lỗi tải mã giảm giá:", err));
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center text-danger fw-bold mb-4">
        🎁 Ưu đãi hôm nay
      </h2>
      <Row>
        {promos.map((promo) => (
          <Col key={promo._id} md={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img variant="top" src={promo.hinhAnh} />
              <Card.Body className="text-center">
                <Card.Title>{promo.maCode}</Card.Title>
                <Card.Text>
                  Giảm {promo.phanTramGiam}% <br />
                  <small>
                    {new Date(promo.ngayBatDau).toLocaleDateString()} –{" "}
                    {new Date(promo.ngayKetThuc).toLocaleDateString()}
                  </small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
