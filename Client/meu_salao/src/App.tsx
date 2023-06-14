import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import "./App.css";

const GET_CLIENTS = gql`
  query {
    clients {
      id
      name
      phoneNumber
      profileImage
      rate
    }
  }
`;

const CREATE_CLIENT = gql`
  mutation CreateClient($createClientInput: CreateClientInput!) {
    createClient(createClientInput: $createClientInput) {
      id
      name
      phoneNumber
      profileImage
      rate
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation UpdateClient($updateClientInput: UpdateClientInput!) {
    updateClient(updateClientInput: $updateClientInput) {
      id
      name
      phoneNumber
      profileImage
      rate
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation DeleteClient($id: Int!) {
    removeClient(id: $id) {
      id
      name
    }
  }
`;

function App() {
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [rate, setRate] = React.useState(0);
  const [clientId, setClientId] = React.useState(null);

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [createClient] = useMutation(CREATE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const [searchQuery, setSearchQuery] = React.useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const clients = data.clients;

  const handleCreateClient = () => {
    createClient({
      variables: {
        createClientInput: {
          name,
          phoneNumber,
          rate,
        },
      },
    })
      .then(() => {
        setName("");
        setPhoneNumber("");
        setRate(0);
      })
      .catch((error) => {
        console.error("Error creating client:", error);
      });
  };

  const handleUpdateClient = () => {
    updateClient({
      variables: {
        updateClientInput: {
          id: clientId,
          name,
          phoneNumber,
          rate,
        },
      },
    })
      .then(() => {
        setClientId(null);
        setName("");
        setPhoneNumber("");
        setRate(0);
      })
      .catch((error) => {
        console.error("Error updating client:", error);
      });
  };

  const handleDeleteClient = (id) => {
    deleteClient({
      variables: {
        id,
      },
    }).catch((error) => {
      console.error("Error deleting client:", error);
    });
  };

  return (
    <div className="app-container">
      <form className="client-form">
      <h1>{clientId ? "Editar Cliente" : "Criar Cliente"}</h1>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="phoneNumber">Número de Telefone:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="rate">Avaliação:</label>
        <input
          type="number"
          id="rate"
          step="0.1"
          min="0"
          max="5"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
        />
        {clientId ? (
          <div className="button-group">
            <button className="cancel-button" onClick={() => setClientId(null)}>
              Cancelar
            </button>
            <button className="update-button" onClick={handleUpdateClient}>
              Atualizar
            </button>
          </div>
        ) : (
          <button className="create-button" onClick={handleCreateClient}>
            Criar
          </button>
        )}
      </form>
      <h1>Lista de Clientes</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pesquisar por nome"
        />
      </div>
      <ul className="client-list">
        {clients
          .filter((client) =>
            client.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((client) => (
            <li key={client.id} className="client-item">
              <div>
                <img
                  src={client.profileImage}
                  alt={client.name}
                  className="client-avatar"
                />
                <div className="client-details">
                  <p className="client-name">Nome: {client.name}</p>
                  <p className="client-phone">
                    Número de telefone: {client.phoneNumber}
                  </p>
                  <p className="client-rate">Avaliação: {client.rate}/5.0</p>
                </div>
              </div>
              <div className="client-actions">
                <button
                  className="edit-button"
                  onClick={() => {
                    setClientId(client.id);
                    setName(client.name);
                    setPhoneNumber(client.phoneNumber);
                    setRate(client.rate);
                  }}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClient(client.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
