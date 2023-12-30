import React, { useState } from 'react'
import Select from 'react-select';

const myComponentStyle = {
    padding: '8px',
    width: 'auto',
    border: 'none',
    outline: 'none',
    borderRadius: '5px',
    fontSize: '-0.125rem',
    lineHeight: '1.25rem',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
};

const myFlexContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '7px',
    marginTop: '15px',
    fontFamily: 'monospace',
    fontWeight: '700',
    fontSize: 'larger',
}

const myBoxStyle = {
    border: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
    padding: '12px',
    borderRadius: '9px',
    marginTop: '12px',
    borderColor: '#536DFE',
    backgroundColor: '#EEF2FF',
    fontFamily: '"JetBrains Mono", monospace',
    boxSizing: 'border-box',
    color: '#536DFE',
    // Additional boxShadow, you might want to merge the two or choose one
    // depending on your design requirements
    boxShadow: 'rgba(83, 109, 254, 0.2) 0 2px 4px, rgba(83, 109, 254, 0.15) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset',
};
export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState(''); // Assuming the initial state for gender is empty
    const [hearAbout, setHearAbout] = useState([]);
    const [city, setCity] = useState('Mumbai'); // Assuming Mumbai as the default city
    const [selectedState, setSelectedState] = useState(null); // Updated state for the selected state

    const stateOptions = [
        { value: 'Gujarat', label: 'Gujarat' },
        { value: 'Maharashtra', label: 'Maharashtra' },
        { value: 'Karnataka', label: 'Karnataka' },
    ];
    const cityOptions = [
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Ahmedabad', label: 'Ahmedabad' },
        { value: 'Pune', label: 'Pune' },
    ];
    const handleSave = () => {
        // Validate and send data to API
        // You can add your API call logic here

        // For simplicity, we are just logging the data to the console
        console.log({
            name,
            email,
            phone,
            gender,
            hearAbout,
            city,
            state: selectedState ? selectedState.value : '', // Retrieve the selected state value
        });

        // Clear form fields after saving
        setName('');
        setEmail('');
        setPhone('');
        setGender('');
        setHearAbout([]);
        setCity('Mumbai');
        setSelectedState(null); // Reset the selected state

    };

    return (
        <div style={{
            // background: 'rgb(238, 242, 255)',
            margin: '0px',
            paddingTop: '10px',
          
        }}>
            <h1 style={{
                fontFamily: 'monospace',
                textAlign: 'center',
                marginTop: '0px',
                fontSize: 'xx-large',
            }}>Signup</h1>
            <div style={{ display: "flex", borderStyle: 'dotted', justifyContent: "center", flexDirection: "column", width: "320px", margin: "auto", marginTop: "23px", gap: "5px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px", padding: "22px", borderRadius: "12px" }}>
                <input
                    style={myComponentStyle}
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    pattern="[A-Za-z ]+"
                    title="Alphabets only"
                    placeholder='Name'
                    required
                />



                <input
                    style={myComponentStyle}
                    id='email'
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="[A-Za-z0-9]+"
                    title="Alphanumeric only"
                    required
                    placeholder='Email'
                />


                <input
                    style={myComponentStyle}
                    id="phone"
                    placeholder='Phone Number'
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    pattern="[0-9]+"
                    title="Number only"
                    required
                />


                <div style={myFlexContainerStyle}>
                    <label for="Gender">
                        Gender: Male </label>
                    <input
                        type="radio"
                        name="gender"
                        value="Male" id="Gender"
                        checked={gender === 'Male'}
                        onChange={() => setGender('Male')}
                    />


                    <label for="Gender">
                        Female
                    </label>
                    <input
                        id="Gender"
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={gender === 'Female'}
                        onChange={() => setGender('Female')}
                    />
                    <label for="Gender">  Others
                    </label>
                    <input
                        type="radio"
                        name="gender"
                        value="Others" id="Gender"
                        checked={gender === 'Others'}
                        onChange={() => setGender('Others')}
                    />

                </div>

                <div style={{
                    fontFamily: 'monospace',
                    fontWeight: '700',
                    marginTop: '16px',
                    padding: '0px',
                    textAlign: 'justify',
                    display: 'block',
                }}>
                    <p> How did you hear about this? </p>
                    <label for="LinkedIn">

                        LinkedIn
                    </label>
                    <input
                        id="LinkedIn"
                        type="checkbox"
                        value="LinkedIn"
                        checked={hearAbout.includes('LinkedIn')}
                        onChange={() => setHearAbout((prev) => toggleCheckbox('LinkedIn', prev))}
                    />

                    <label for="Friends">Friends
                    </label>
                    <input
                        id="Friends"
                        type="checkbox"
                        value="Friends"
                        checked={hearAbout.includes('Friends')}
                        onChange={() => setHearAbout((prev) => toggleCheckbox('Friends', prev))}
                    />

                    <label for="JobPortal">Job Portal
                    </label>
                    <input
                        id="JobPortal"
                        type="checkbox"
                        value="Job Portal"
                        checked={hearAbout.includes('Job Portal')}
                        onChange={() => setHearAbout((prev) => toggleCheckbox('Job Portal', prev))}
                    />

                    <label for="Others"> Others
                    </label>
                    <input
                        id="Others"
                        type="checkbox"
                        value="Others"
                        checked={hearAbout.includes('Others')}
                        onChange={() => setHearAbout((prev) => toggleCheckbox('Others', prev))}
                    />

                </div>


                <label style={{
                    paddingTop: '8px',
                    fontFamily: 'monospace',
                    fontWeight: '700',
                    fontSize: 'larger',
                }} for="city">
                    City:  </label>

                <Select
                    id="city"
                    options={cityOptions}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Select city..."

                >

                </Select>


                <label style={{
                    paddingTop: '8px',
                    fontFamily: 'monospace',
                    fontWeight: '700',
                    fontSize: 'larger',
                }} for="state">
                    State:
                </label>
                <Select id="state"
                    options={stateOptions}
                    value={selectedState}
                    onChange={(value) => setSelectedState(value)}
                    placeholder="Select state..."
                />

                <button style={myBoxStyle} onClick={handleSave}>Submit</button>
            </div >
        </div >
    );
}

const toggleCheckbox = (value, array) => {
    if (array.includes(value)) {
        return array.filter((item) => item !== value);
    } else {
        return [...array, value];
    }
};