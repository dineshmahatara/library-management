'use client'
import React ,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'; // Import Axios
import Autocomplete from "@mui/material/Autocomplete";
import { TextField, MenuItem, Button } from "@mui/material";
import localData from "../../utils/dropdowndata.json";
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const SignupForm = (values) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
      role: '',
      name: '',
      iemisId: "1",
      phone: '',
      province: '',
      district: '',
      // iemisId: '',
      // schoolId: '',
      // borrowed_books: '',
      status:"Pending"
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        values.province = selectedProvince;
        values.district = selectedDistrict;
        values.municipality = selectedMunicipality;
        const response = await axios.post('http://localhost:4000/api/users',values);
        console.log('API Response:', response.data); // Add this line

        alert(JSON.stringify(response.data, null, 2)); // Display response data
      } catch (error) {
        console.error('Error submitting the form:', error);
      }
    },
  });
  const roles = ["Municipality", "Admin", "Student", "School"]; // Roles dropdown options

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          fullWidth
          id="iemisId"
          name="iemisId"
          label="iemisId"
          value={formik.values.iemisId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.iemisId && Boolean(formik.errors.iemisId)}
          helperText={formik.touched.iemisId && formik.errors.iemisId}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
              <Autocomplete
          options={roles} // Use the roles array as options
          value={formik.values.role}
          onChange={(event, newValue) => formik.setFieldValue('role', newValue)} // Set the value in formik
          renderInput={(params) => (
            <TextField
              {...params}
              name="role"
              label="Select Role"
              variant="outlined"
              className="mb-4"
              fullWidth
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
            />
          )}
          fullWidth
        />
        <div className="mb-4">
          <Autocomplete
            options={localData.provinceList.map((province) => province.name)}
            value={selectedProvince}
            onChange={(event, newValue) => setSelectedProvince(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="province"
                label="Select Province"
                variant="outlined"
                className="mb-4"
                fullWidth
              />
            )}
            fullWidth
          />
        </div>

        <div className="mb-4">
          <Autocomplete
            options={
              localData.provinceList
                .find((province) => province.name === selectedProvince)
                ?.districtList.map((district) => district.name) || []
            }
            value={selectedDistrict}
            onChange={(event, newValue) => setSelectedDistrict(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="district"
                label="Select District"
                variant="outlined"
                className="mb-4"
                fullWidth
              />
            )}
            fullWidth
          />
        </div>

        <div className="mb-4">
          <Autocomplete
            options={
              localData.provinceList
                .find((province) => province.name === selectedProvince)
                ?.districtList.find(
                  (district) => district.name === selectedDistrict
                )
                ?.municipalityList.map((municipality) => municipality.name) ||
              []
            }
            value={selectedMunicipality}
            onChange={(event, newValue) => setSelectedMunicipality(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="municipality"
                label="Select Municipality"
                variant="outlined"
                className="mb-4"
                fullWidth
              />
            )}
            fullWidth
          />
        </div>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default SignupForm