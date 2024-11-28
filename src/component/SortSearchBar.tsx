import React from 'react'
import { Stack, InputGroup, Form } from 'react-bootstrap';


interface SortSearchBarProps {
    handleDropdownChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    sortType: string,
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const SortSearchBar: React.FC<SortSearchBarProps> = ({ handleDropdownChange, sortType, searchTerm, setSearchTerm }) => {
    return (
        <Stack direction="horizontal" gap={3} style={{ backgroundColor: '#f5f5f5' }} className='p-3 '>
            <div style={{ minWidth: '8%' }}>
                <Form.Select value={sortType} onChange={handleDropdownChange}
                >
                    <option>Sort By...</option>
                    <option value="release_date">Year</option>
                    <option value="title">Episode</option>
                </Form.Select>
            </div>
            <div className="vr" />
            <div className="" style={{ minWidth: '85%' }}>
                <InputGroup >
                    <InputGroup.Text id="btnGroupAddon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Type to search..."
                        aria-describedby="btnGroupAddon"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </div>
        </Stack >
    )
}

export default SortSearchBar