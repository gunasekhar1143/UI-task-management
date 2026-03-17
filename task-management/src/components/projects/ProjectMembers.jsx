import { useState } from "react";
import "../../css/ProjectMembers.css";

function ProjectMembers({
  members,
  users,
  showUsers,
  handleAddMembers,
  handleAssignUser
}) {

  const [showModal, setShowModal] = useState(false);

  const openModal = async () => {
    await handleAddMembers();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (

    <div className="members-section">

      <div className="members-header">

        <h3>Project Members</h3>

        <button
          className="add-members-btn"
          onClick={openModal}
        >
          Add Members
        </button>

      </div>

      {/* ASSIGNED MEMBERS */}

      {members.length === 0 ? (

        <p>No members assigned yet.</p>

      ) : (

        <table className="members-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>

            {members.map((member) => (

              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
              </tr>

            ))}

          </tbody>

        </table>

      )}

      {/* MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <h3>Add Members</h3>

              <button
                className="close-btn"
                onClick={closeModal}
              >
                ✕
              </button>

            </div>

            <table className="users-table">

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>

                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>

                    <td>

                      <button
                        className="add-user-btn"
                        onClick={() => handleAssignUser(user.id)}
                      >
                        Add
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>

  );

}

export default ProjectMembers;