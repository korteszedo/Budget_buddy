import "./Admin.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteUser, editUser, getUsers } from "../fetch"
import edit from "../img/edit.png"
import kuka from "../img/kuka_icon.png"
import logo from "../img/logo.png"

export default function Admin() {
    const [users, setUsers] = useState([])
    const [editingUserId, setEditingUserId] = useState(null)
    const [editName, setEditName] = useState("")
    const [editEmail, setEditEmail] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            setUsers([])
            navigate("/", { replace: true })
            return
        }

        getUsers(token).then((data) => {
            setUsers(Array.isArray(data) ? data : [])
        })
    }, [navigate])

    function getUserId(user) {
        return user.felhasznalo_id ?? user.userId ?? user.id
    }

    function getUserName(user) {
        return user.nev ?? user.name ?? user.username ?? "Ismeretlen"
    }

    function getEditableName(user) {
        return user.nev ?? user.name ?? user.username ?? ""
    }

    function getUserEmail(user) {
        return user.email ?? "Nem elérhető"
    }

    function getEditableEmail(user) {
        return user.email ?? ""
    }

    function resetEdit() {
        setEditingUserId(null)
        setEditName("")
        setEditEmail("")
    }

    function startEdit(user) {
        const userId = getUserId(user)
        if (!userId) {
            return
        }

        setEditingUserId(userId)
        setEditName(getEditableName(user))
        setEditEmail(getEditableEmail(user))
    }

    function handleSave(userId) {
        const token = localStorage.getItem("token")
        if (!token || !userId) {
            return
        }

        const nameValue = editName.trim()
        const emailValue = editEmail.trim()

        setIsSaving(true)
        editUser(token, userId, nameValue, emailValue)
            .then(() => {
                setUsers((prev) =>
                    prev.map((user) =>
                        getUserId(user) === userId
                            ? {
                                  ...user,
                                  nev: nameValue,
                                  name: nameValue,
                                  email: emailValue,
                              }
                            : user
                    )
                )
                resetEdit()
            })
            .finally(() => setIsSaving(false))
    }

    function handleDelete(userId) {
        const token = localStorage.getItem("token")
        if (!token || !userId) {
            return
        }

        deleteUser(token, userId).then(() => {
            if (editingUserId === userId) {
                resetEdit()
            }
            setUsers((prev) =>
                prev.filter((user) => getUserId(user) !== userId)
            )
        })
    }

    function handleExit() {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        navigate("/", { replace: true })
    }

    return (
        <div className="admin-page">
            <header className="admin-topbar">
                <div className="admin-brand">
                    <img src={logo} alt="Budget Buddy" className="admin-logo" />
                </div>
                <div className="admin-title">Adminisztrátor</div>
                <button className="admin-exit" type="button" onClick={handleExit}>
                    Kilépés
                </button>
            </header>

            <main className="admin-main">
                <section className="admin-card admin-card--desktop">
                    <div className="admin-table">
                        <div className="admin-row admin-row--head">
                            <div>Név</div>
                            <div>Email cím</div>
                            <div>Kezelés</div>
                        </div>
                        {users.map((user, index) => {
                            const userId = getUserId(user)
                            const isEditing = editingUserId === userId
                            return (
                                <div
                                    className="admin-row"
                                    key={userId ?? `${user.email}-${index}`}
                                    style={{ animationDelay: `${index * 80}ms` }}
                                >
                                    <div className="admin-name">
                                        {isEditing ? (
                                            <input
                                                className="admin-edit-input"
                                                type="text"
                                                value={editName}
                                                onChange={(event) =>
                                                    setEditName(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            getUserName(user)
                                        )}
                                    </div>
                                    <div className="admin-email">
                                        {isEditing ? (
                                            <input
                                                className="admin-edit-input"
                                                type="email"
                                                value={editEmail}
                                                onChange={(event) =>
                                                    setEditEmail(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            getUserEmail(user)
                                        )}
                                    </div>
                                    <div
                                        className={`admin-actions ${
                                            isEditing ? "admin-actions--edit" : ""
                                        }`}
                                    >
                                        {isEditing ? (
                                            <>
                                                <button
                                                    className="admin-btn admin-btn--save"
                                                    type="button"
                                                    onClick={() =>
                                                        handleSave(userId)
                                                    }
                                                    disabled={isSaving}
                                                >
                                                    Mentés
                                                </button>
                                                <button
                                                    className="admin-link admin-link--muted"
                                                    type="button"
                                                    onClick={resetEdit}
                                                    disabled={isSaving}
                                                >
                                                    Mégse
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="admin-btn"
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(userId)
                                                    }
                                                    disabled={!userId}
                                                >
                                                    <img
                                                        className="admin-icon"
                                                        src={kuka}
                                                        alt="Törlés"
                                                    />
                                                    Törlés
                                                </button>
                                                <button
                                                    className="admin-link"
                                                    type="button"
                                                    onClick={() =>
                                                        startEdit(user)
                                                    }
                                                    disabled={!userId}
                                                >
                                                    <img
                                                        className="admin-icon"
                                                        src={edit}
                                                        alt="Szerkesztés"
                                                    />
                                                    Szerkesztés
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section className="admin-card admin-card--mobile">
                    <div className="admin-mobile-title">Adatok</div>
                    <div className="admin-mobile-list">
                        {users.map((user, index) => {
                            const userId = getUserId(user)
                            const isEditing = editingUserId === userId
                            return (
                                <div
                                    className="admin-mobile-item"
                                    key={userId ?? `${user.email}-${index}`}
                                    style={{ animationDelay: `${index * 80}ms` }}
                                >
                                    <div className="admin-mobile-info">
                                        <div className="admin-mobile-name">
                                            {isEditing ? (
                                                <input
                                                    className="admin-edit-input"
                                                    type="text"
                                                    value={editName}
                                                    onChange={(event) =>
                                                        setEditName(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            ) : (
                                                getUserName(user)
                                            )}
                                        </div>
                                        <div className="admin-mobile-email">
                                            {isEditing ? (
                                                <input
                                                    className="admin-edit-input"
                                                    type="email"
                                                    value={editEmail}
                                                    onChange={(event) =>
                                                        setEditEmail(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            ) : (
                                                getUserEmail(user)
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`admin-mobile-actions ${
                                            isEditing
                                                ? "admin-mobile-actions--edit"
                                                : ""
                                        }`}
                                    >
                                        {isEditing ? (
                                            <>
                                                <button
                                                    className="admin-btn admin-btn--save admin-btn--compact"
                                                    type="button"
                                                    onClick={() =>
                                                        handleSave(userId)
                                                    }
                                                    disabled={isSaving}
                                                >
                                                    Mentés
                                                </button>
                                                <button
                                                    className="admin-link admin-link--muted"
                                                    type="button"
                                                    onClick={resetEdit}
                                                    disabled={isSaving}
                                                >
                                                    Mégse
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="admin-icon-btn admin-icon-btn--danger"
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(userId)
                                                    }
                                                    disabled={!userId}
                                                >
                                                    <img src={kuka} alt="Törlés" />
                                                </button>
                                                <button
                                                    className="admin-icon-btn"
                                                    type="button"
                                                    onClick={() =>
                                                        startEdit(user)
                                                    }
                                                    disabled={!userId}
                                                >
                                                    <img
                                                        src={edit}
                                                        alt="Szerkesztés"
                                                    />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>
        </div>
    )
}
