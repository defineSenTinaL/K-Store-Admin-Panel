import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

import {
  updateInvoiceAddress,
  updatePickupAddress,
} from "../functions/profile";

export default function Profile() {
  const loggedInSeller = useSelector((state) => state.seller);
  const { name, email, mobile, invoiceAddress, returnAddress, taxInformation } =
    loggedInSeller;

  const [isEditingInvoice, setIsEditingInvoice] = useState(false);
  const [isEditingPickup, setIsEditingPickup] = useState(false);
  const [editableInvoiceAddress, setEditableInvoiceAddress] =
    useState(invoiceAddress);
  const [editablePickupAddress, setEditablePickupAddress] =
    useState(returnAddress);

  const handleInvoiceEditClick = () => {
    setIsEditingInvoice(!isEditingInvoice);
    if (!isEditingInvoice) {
      setEditableInvoiceAddress(invoiceAddress);
    }
  };

  const handlePickupEditClick = () => {
    setIsEditingPickup(!isEditingPickup);
    if (!isEditingPickup) {
      setEditablePickupAddress(returnAddress);
    }
  };

  const handleInvoiceAddressUpdate = async () => {
    try {
      const updatedSeller = await updateInvoiceAddress(
        loggedInSeller._id,
        editableInvoiceAddress
      );
      // Update the state or dispatch an action to update the Redux store with the updated seller
      // Example: dispatch(updateSeller(updatedSeller));
      setIsEditingInvoice(false);
    } catch (error) {
      console.error("Error updating invoice address:", error);
    }
  };

  const handlePickupAddressUpdate = async () => {
    try {
      const updatedSeller = await updatePickupAddress(
        loggedInSeller._id,
        editablePickupAddress
      );
      // Update the state or dispatch an action to update the Redux store with the updated seller
      // Example: dispatch(updateSeller(updatedSeller));
      setIsEditingPickup(false);
    } catch (error) {
      console.error("Error updating pickup address:", error);
    }
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <h1>Seller</h1>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "250px", height: "250px" }}
                  fluid
                />
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="twitter fa-lg"
                      style={{ color: "#55acee" }}
                    />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <a
                    href="https://www.instagram.com/dintly.in/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="instagram fa-lg"
                        style={{ color: "#ac2bac" }}
                      />
                      <MDBCardText>Dintly.in</MDBCardText>
                    </MDBListGroupItem>
                  </a>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="facebook fa-lg"
                      style={{ color: "#3b5998" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4 mb-lg-0 mt-4">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <h3>Tax Information</h3>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText>GST No.</MDBCardText>
                    <MDBCardText>{taxInformation.gstNumber}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText>State</MDBCardText>

                    <MDBCardText>{taxInformation.gstState}</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      +91 {mobile}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Landline</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      (098) 765-4321
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">
                        Seller Invoice Address
                      </span>{" "}
                      <FiEdit
                        onClick={handleInvoiceEditClick}
                        className="cursor-pointer"
                      />
                    </MDBCardText>
                    {isEditingInvoice ? (
                      // Editable invoice address inputs
                      <div>
                        <MDBCardText
                          className="mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Address Line
                        </MDBCardText>
                        <MDBInput
                          type="text"
                          value={editableInvoiceAddress.addressLine}
                          onChange={(e) =>
                            setEditableInvoiceAddress({
                              ...editableInvoiceAddress,
                              addressLine: e.target.value,
                            })
                          }
                        />
                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Street
                        </MDBCardText>
                        <MDBInput
                          type="text"
                          value={editableInvoiceAddress.street}
                          onChange={(e) =>
                            setEditableInvoiceAddress({
                              ...editableInvoiceAddress,
                              street: e.target.value,
                            })
                          }
                        />
                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          City
                        </MDBCardText>
                        <MDBInput
                          type="text"
                          value={editableInvoiceAddress.city}
                          onChange={(e) =>
                            setEditableInvoiceAddress({
                              ...editableInvoiceAddress,
                              city: e.target.value,
                            })
                          }
                        />
                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          State
                        </MDBCardText>
                        <MDBInput
                          type="text"
                          value={editableInvoiceAddress.state}
                          onChange={(e) =>
                            setEditableInvoiceAddress({
                              ...editableInvoiceAddress,
                              state: e.target.value,
                            })
                          }
                        />
                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Pincode
                        </MDBCardText>
                        <MDBInput
                          type="text"
                          value={editableInvoiceAddress.pincode}
                          onChange={(e) =>
                            setEditableInvoiceAddress({
                              ...editableInvoiceAddress,
                              pincode: e.target.value,
                            })
                          }
                        />
                        <br />
                        <MDBBtn onClick={handleInvoiceAddressUpdate}>
                          Save
                        </MDBBtn>
                      </div>
                    ) : (
                      <>
                        <MDBCardText
                          className="mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Address Line
                        </MDBCardText>
                        <p>{invoiceAddress.addressLine}</p>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Street
                        </MDBCardText>
                        <p>{invoiceAddress.street}</p>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          City
                        </MDBCardText>
                        <p>{invoiceAddress.city}</p>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          State
                        </MDBCardText>
                        <p>{invoiceAddress.state}</p>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Pincode
                        </MDBCardText>
                        <p>{invoiceAddress.pincode}</p>
                      </>
                    )}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">
                        Seller Pickup Address
                      </span>{" "}
                      <FiEdit
                        onClick={handlePickupEditClick}
                        className="cursor-pointer"
                      />
                    </MDBCardText>
                    {isEditingPickup ? (
                      // Editable invoice address inputs
                      <div>
                      <MDBCardText
                          className="mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Name
                        </MDBCardText>
                        <MDBInput
                          type="text"
                          value={editablePickupAddress.name}
                          onChange={(e) =>
                            setEditablePickupAddress({
                              ...editablePickupAddress,
                              name: e.target.value,
                            })
                          }
                        />
                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Mobile
                        </MDBCardText>
                        <MDBInput
                          type="text"
                          value={editablePickupAddress.mobile}
                          onChange={(e) =>
                            setEditablePickupAddress({
                              ...editablePickupAddress,
                              mobile: e.target.value,
                            })
                          }
                        />
                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Address Line
                        </MDBCardText>
                        <MDBInput
                          type="text"
                          value={editablePickupAddress.addressLine}
                          onChange={(e) =>
                            setEditablePickupAddress({
                              ...editablePickupAddress,
                              addressLine: e.target.value,
                            })
                          }
                        />
                                                <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Street
                        </MDBCardText>
                        <MDBInput
                          type="text"
                          value={editablePickupAddress.street}
                          onChange={(e) =>
                            setEditablePickupAddress({
                              ...editablePickupAddress,
                              street: e.target.value,
                            })
                          }
                        />
                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          City
                        </MDBCardText>
                        <MDBInput
                          type="text"
                          value={editablePickupAddress.city}
                          onChange={(e) =>
                            setEditablePickupAddress({
                              ...editablePickupAddress,
                              city: e.target.value,
                            })
                          }
                        />
                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          State
                        </MDBCardText>
                        <MDBInput
                          type="text"
                          value={editablePickupAddress.state}
                          onChange={(e) =>
                            setEditablePickupAddress({
                              ...editablePickupAddress,
                              state: e.target.value,
                            })
                          }
                        />
                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Pincode
                        </MDBCardText>
                        <MDBInput
                          type="text"
                          value={editablePickupAddress.pincode}
                          onChange={(e) =>
                            setEditablePickupAddress({
                              ...editablePickupAddress,
                              pincode: e.target.value,
                            })
                          }
                        />
                        <br />
                        <MDBBtn onClick={handlePickupAddressUpdate}>
                          Save
                        </MDBBtn>
                      </div>
                    ) : (
                      <>
                        <MDBCardText
                          className="mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Name
                        </MDBCardText>
                        <p>{returnAddress.name}</p>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Mobile
                        </MDBCardText>
                        <p>{returnAddress.mobile}</p>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Address Line
                        </MDBCardText>
                        <p>{returnAddress.addressLine}</p>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Street
                        </MDBCardText>
                        <p>{returnAddress.street}</p>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          City
                        </MDBCardText>
                        <p>{returnAddress.city}</p>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          State
                        </MDBCardText>
                        <p>{returnAddress.state}</p>

                        <MDBCardText
                          className="mt-4 mb-1"
                          style={{ fontSize: "20px" }}
                        >
                          Pincode
                        </MDBCardText>
                        <p>{returnAddress.pincode}</p>
                      </>
                    )}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
