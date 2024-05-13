import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useState } from 'react';

const SearchMember = ({ memberData, onSelect }) => {
  function formatMembers(members) {
    if (!members || !Array.isArray(members)) {
      return [];
    }
    return members.map(member => ({
      ...member,
      name: `${member.firstName} ${member.middleName} ${member.lastName}`,
    }));
  }

  const members = formatMembers(memberData);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? members
      : members.filter(person => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <Combobox
      value={selectedPerson}
      onChange={newPerson => {
        setSelectedPerson(newPerson);
        onSelect(newPerson);
      }}
      onClose={() => {
        setQuery('');
      }}
    >
      <ComboboxInput
        style={{
          width: '100%',
          height: '40px',
          padding: '8px 12px',
          backgroundColor: 'white',
          border: '1px solid black',
          color: 'black',
        }}
        aria-label="Assignee"
        displayValue={person => person?.name}
        onChange={event => {
          setQuery(event.target.value);
        }}
      />
      <div className="relative">
        <ComboboxOptions
          anchor="bottom"
          style={{ backgroundColor: '1px solid black' }}
          className="empty:hidden z-50 absolute bg-white border border-gray-200 shadow-lg mt-1"
        >
          {filteredPeople.map(person => (
            <ComboboxOption
              key={person.id}
              value={person}
              style={{ padding: '8px 12px', width: '380px' }}
              className="data-[focus]:bg-blue-100"
            >
              {person.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};

export default SearchMember;
