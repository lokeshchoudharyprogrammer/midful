import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
    gap: '0px',
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
    boxShadow: 'rgba(83, 109, 254, 0.2) 0 2px 4px, rgba(83, 109, 254, 0.15) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset',
};
export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState(''); // Assuming the initial state for gender is empty
    const [hearAbout, setHearAbout] = useState([]);
    const [city, setCity] = useState('Mumbai'); // Assuming Mumbai as the default city
    const [selectedState, setSelectedState] = useState(null); // Updated state for the selected state
    const toast = useToast()
    const navigate = useNavigate();
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
    const handleSave = async () => {

        console.log({
            name,
            email,
            phone,
            gender,
            hearAbout,
            city,
            state: selectedState ? selectedState.value : ''
        });

        let formData = {
            name,
            email,
            password,
            phone,
            gender,
            hearAbout,
            city: city ? city.value : '',
            state: selectedState ? selectedState.value : '',
        };
        try {
            const response = await fetch('http://localhost:3100/register', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            

            toast({
                title: `${data?.message}`,
                status: 'success',
                isClosable: true,
                position: "top-right",
                duration: 1000,
            });

            setTimeout(() => {

                if (data?.message) {

                    navigate('/login')
                }
            }, 3000);

        } catch (error) {
            console.error(error);
        }
        // Clear form fields after saving
        setName('');
        setEmail('');
        setpassword('')
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
            <div style={{ display: "flex", borderStyle: 'dotted', justifyContent: "center", flexDirection: "column", width: "345px", margin: "auto", marginTop: "23px", gap: "5px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px", padding: "22px", borderRadius: "12px" }}>
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
                    id='password'
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    pattern="[A-Za-z0-9]+"
                    title="Alphanumeric only"
                    required
                    placeholder='Password'
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
                        onChange={() => setGender('Male')} required
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
                        onChange={() => setGender('Female')} required
                    />
                    <label for="Gender">  Others
                    </label>
                    <input
                        type="radio"
                        name="gender"
                        value="Others" id="Gender"
                        checked={gender === 'Others'}
                        onChange={() => setGender('Others')} required
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
                    <input required
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
                        onChange={() => setHearAbout((prev) => toggleCheckbox('Friends', prev))} required
                    />

                    <label for="JobPortal">Job Portal
                    </label>
                    <input
                        id="JobPortal"
                        type="checkbox"
                        value="Job Portal"
                        checked={hearAbout.includes('Job Portal')}
                        onChange={() => setHearAbout((prev) => toggleCheckbox('Job Portal', prev))} required
                    />

                    <label for="Others"> Others
                    </label>
                    <input
                        id="Others"
                        type="checkbox"
                        value="Others"
                        checked={hearAbout.includes('Others')}
                        onChange={() => setHearAbout((prev) => toggleCheckbox('Others', prev))} required
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
                    onChange={(value) => setCity(value)}
                    placeholder="Select city..."
                    required

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
                    required
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