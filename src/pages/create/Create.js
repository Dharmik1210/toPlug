// import './Create.css';

// import { useState, useEffect } from 'react';
// import Select from 'react-select';
// import { useAuthcontext } from '../../hooks/useAuthContext';
// import { useCollection } from '../../hooks/useCollection';
// import { timestamp } from '../../firebase/config';
// import { useFirestore } from '../../hooks/useFirestore';
// import { useHistory } from 'react-router-dom';

// //diff. categories
// const categories = [
//   { value: 'appdevelopment', label: 'App Development' },
//   { value: 'webdevelopment', label: 'Web Development' },
//   { value: 'design', label: 'Design' },
//   { value: 'sales', label: 'Sales' },
//   { value: 'marketing', label: 'Marketing' },
// ];

// export default function Create() {
//   const history = useHistory();
//   const { addDocument, response } = useFirestore('projects');
//   const { documents } = useCollection('users');
//   const [users, setUsers] = useState([]);
//   const { user } = useAuthcontext();
//   //form fields values
//   const [name, setName] = useState('');
//   const [details, setDetails] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [category, setCategory] = useState('');
//   const [assignedUsers, setAssignedUsers] = useState([]);
//   const [formError, setFormError] = useState(null);

//   useEffect(() => {
//     if (documents) {
//       const options = documents.map((user) => {
//         return { value: user, label: user.displayName };
//       });
//       setUsers(options);
//     }
//   }, [documents]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError(null);
//     if (!category) {
//       setFormError('Please add any one category');
//       return;
//     }

//     if (assignedUsers.length < 1) {
//       setFormError('Please add at least one user');
//       return;
//     }

//     const createdBy = {
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//       id: user.uid,
//     };

//     const assignedUsersList = assignedUsers.map((u) => {
//       return {
//         displayName: u.value.displayName,
//         photoURL: u.value.photoURL,
//         id: u.value.id,
//       };
//     });

//     const project = {
//       name,
//       details,
//       category: category.value,
//       dueDate: timestamp.fromDate(new Date(dueDate)),
//       assignedUsersList,
//       createdBy,
//       comments: [],
//     };

//     await addDocument(project);
//     if (!response.error) {
//       history.push('/');
//     }
//   };
//   return (
//     <div className="create-form">
//       <h2 className="page-title">New project Details</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           <span>Project Name:</span>
//           <input
//             required
//             type="text"
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//           />
//         </label>
//         <label>
//           <span>Project Details:</span>
//           <textarea
//             required
//             type="text"
//             onChange={(e) => setDetails(e.target.value)}
//             value={details}
//           />
//         </label>
//         <label>
//           <span>Set due date:</span>
//           <input
//             required
//             type="date"
//             onChange={(e) => setDueDate(e.target.value)}
//             value={dueDate}
//           />
//         </label>
//         <label>
//           <span>Project Category:</span>
//           <Select
//             onChange={(option) => setCategory(option)}
//             options={categories}
//           />
//         </label>
//         <label>
//           <span>Assign to:</span>
//           <Select
//             onChange={(option) => setAssignedUsers(option)}
//             options={users}
//             isMulti
//           />
//         </label>
//         <button className="btn">Add project</button>
//         {formError && <p className="error">{formError}</p>}
//       </form>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { timestamp } from '../../firebase/config';
import { useFirestore } from '../../hooks/useFirestore';
import { useHistory } from 'react-router';
import Select from 'react-select';

// styles
import './Create.css';

const categories = [
  { value: 'appdevelopment', label: 'App Development' },
  { value: 'webdevelopment', label: 'Web Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

export default function Create() {
  const history = useHistory();
  const { addDocument, response } = useFirestore('projects');
  const { user } = useAuthContext();
  const { documents } = useCollection('users');
  const [users, setUsers] = useState([]);

  // form field values
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  // create user values for react-select
  useEffect(() => {
    if (documents) {
      setUsers(
        documents.map((user) => {
          return { value: { ...user, id: user.id }, label: user.displayName };
        })
      );
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select a project category.');
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user');
      return;
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const project = {
      name,
      details,
      assignedUsersList,
      createdBy,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
    };

    await addDocument(project);
    if (!response.error) {
      history.push('/');
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Add Project</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
