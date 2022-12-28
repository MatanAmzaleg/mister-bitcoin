import { contactService } from "../../services/contact.service"

export function loadContacts() {

    return async (dispatch, getState) => {
        try {
            const filterBy = getState().contactModule.filterBy
            const contacts = await contactService.getContacts(filterBy)
            console.log('contacts',contacts);
            dispatch({ type: 'SET_CONTACTS', contacts })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeContact(contactId) {

    return async (dispatch) => {
        try {
            const contacts = await contactService.deleteContact(contactId)
            dispatch({ type: 'REMOVE_CONTACT', contactId })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function addContact(contactToSave) {
    return async (dispatch) => {
        try {
            const contact = await contactService.saveContact(contactToSave)
            dispatch({ type: 'ADD_CONTACT', contact })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function setContactToSave(contact) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_CONTACT_TO_SAVE', contact })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function getContact(contactId) {
    return async () => {
        try {
            const contact = contactId ? await contactService.getContactById(contactId) : contactService.getEmptyContact()
            console.log(contact);
            // dispatch({ type: 'ADD_CONTACT', contact })
            return contact
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {

    return (dispatch) => {
        try {
            dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}