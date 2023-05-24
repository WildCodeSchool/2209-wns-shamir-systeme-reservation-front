import { Alert, Button, Form } from "react-bootstrap";
import "./contact.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { MAKING_CONTACT } from "../../graphql/mutations";

export default function Contact() {

  const [name, setName]                     = useState<string>("");
  const [email, setEmail]                   = useState<string>("");
  const [subject, setSubject]               = useState<string>("");
  const [message, setMessage]               = useState<string>("");
  const [messageConfirm, setMessageConfirm] = useState<string>("");

  const [makingContact] = useMutation(MAKING_CONTACT);

  const submitContact = (e: any): void => {
    e.preventDefault();
    handleSubmit(name, email, subject, message);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setMessageConfirm("");
  };

  const handleSubmit = (name: string, email: string, subject: string, message: string): void => {
    makingContact({
      variables: {
        name,
        email,
        subject,
        message
      }
    }).then(({data})=>{
      setMessageConfirm(data.makingContact);
      setTimeout(() => {
        const confirmAlert = document.querySelector("#confirmAlert");
        confirmAlert?.classList.add("displayNone");
      }, 4000);
    }).catch((e)=>{
      console.log("Une erreur est survenue : ", e)
    })
  };

  return (
    <div className="contactContainer">
      <h1>Contact</h1>
      <div className="contactBodyContainer">
        <Form className="formContainer" onSubmit={submitContact}>
          <Form.Group>
            <Form.Label>Nom</Form.Label>
            <Form.Control className="mb-3 form-control form-control-lg" value={name} onChange={(e)=>setName(e.target.value)} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" className="mb-3 form-control form-control-lg" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Label>Objet</Form.Label>
          <Form.Select className="mb-3 custom-select custom-select-lg" value={subject} onChange={(e)=>setSubject(e.target.value)} size="lg">
            <option value="">Sélectionnez une rubrique</option>
            <option value="- réservation">Question sur ma réservation</option>
            <option value="- produit">Question sur un produit</option>
            <option value="- divers">Autre question</option>
          </Form.Select>

          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control className="textAreaForm form-control-lg" as="textarea" rows={10} value={message} onChange={(e)=>setMessage(e.target.value)} required />
          </Form.Group>

          <div className="btnForm">
            <Button type="submit" className="btnWild mt-5">Envoyer</Button>
          </div>
            {messageConfirm && <Alert id="confirmAlert">{messageConfirm}</Alert>}
        </Form>
        <div className="contactInfos">
          <div className="mapForm">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1202705.664939925!2d6.119831448382577!3d45.560613372086294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47894572bacbb6fd%3A0x52847a6e98cad9fc!2sAlpes%20Fran%C3%A7aises!5e0!3m2!1sfr!2sfr!4v1677768722258!5m2!1sfr!2sfr" height="400px" ></iframe>
          </div>
          <div className="infosContact">
            <div>
              <h3>Adresse</h3>
              <p>10 Rue de la Montagne</p>
              <p>Alpes, FRANCE</p>
            </div>
            <div>
              <h3>N° de téléphone</h3>
              <p>02 99 88 77 55</p>
            </div>
            <div>
              <h3>Horaires</h3>
              <p>Lundi au vendredi de 8h à 20h</p>
              <p>Samedi de 8h à 18h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
