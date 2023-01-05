import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

const Sort = ({listPharmacyFiltered, setListPharmacyFiltered}) => {

    const orderByName = (type) => {
        let newList = [];
        switch(type){
            case 'AZ':
                newList = listPharmacyFiltered.sort((a, b) => a.local_nombre.trim().localeCompare(b.local_nombre.trim()));
                break;
            case 'ZA':
                newList = listPharmacyFiltered.sort((a, b) => b.local_nombre.trim().localeCompare(a.local_nombre.trim()));
                break;
            default:
                break;
        }
        setListPharmacyFiltered([...newList]);
    }

    return (
        <Dropdown className="ms-2">
            <Dropdown.Toggle className="no-caret" variant="light">
                <span className="material-icons align-middle">tune</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item as="button" onClick={() => orderByName('AZ')}>Ordenar de A-Z</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => orderByName('ZA')}>Ordenar de Z-A</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Sort