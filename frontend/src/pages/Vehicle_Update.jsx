import react from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Perks from "../Components/Perks.jsx";
import Photos_Update from "../Components/Photos_Update.jsx";
import Default_Layout from '../Components/Default_Layout.jsx';
import StatusToggle from '../Components/StatusToggle.jsx';
import { Form_Validation } from '../Components/Form_Validation.jsx';
import Swal from 'sweetalert2';
axios.defaults.baseURL = 'http://localhost:8090';

function Vehicle_Update() {
  

  const { id } = useParams()
  const [validationErrors, setValidationErrors] = useState({});
  const [type, settype] = useState()
  const [license, setlicense] = useState()
  const [model, setmodel] = useState()
  const [location, setlocation] = useState()
  const [year, setyear] = useState()
  const [seat, setseat] = useState()
  const [mileage, setmileage] = useState()
  const [transmission, settransmission] = useState()
  const [fuel, setfuel] = useState()
  const [perks, setperks] = useState([])
  const [photos, setphotos] = useState([])
  const [price, setprice] = useState()
  const [description, setdescription] = useState()
  const [originalMileage, setOriginalMileage] = useState(0);
  const [showServiceWarning, setShowServiceWarning] = useState(false);
  const [warningShown, setWarningShown] = useState(false);

  

  const handleLicenseBlur = () => {
    // Trigger validation for the license field when it loses focus
    Form_Validation.validate(
      {
        type,
        license,
        model,
        location,
        year,
        seat,
        mileage,
        transmission,
        fuel,
        perks,
        photos,
        price,
        description,
        status,
      },
      { abortEarly: false }
    )
      .then(() => {
        // Validation passed for the license field
        // You can perform any actions here
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          const errors = {};
          error.inner.forEach((err) => {
            errors[err.path] = err.message;
          });
          setValidationErrors(errors);
          // Handle license field validation errors here if needed
        } else {
          console.error(error);
        }
      });
  };

  const navigate = useNavigate()
  const navigateBack = () => {
    window.history.back();}

    const showServiceWarningAlert = () => {
      Swal.fire({
        title: 'Service Required',
        text: "The vehicle's mileage has increased by 5000 or more. Service is required.",
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    };
    

  const clearPhotoValidationError = () => {
    setValidationErrors({ ...validationErrors, photos: '' });
  };

  const [status, setStatus] = useState('');
  const handleStatusToggle = (newStatus) => {
    setStatus(newStatus);
  };

  useEffect(() => {

    axios.get('/vehicles/upVehicles/' + id)
      .then(result => {
        console.log(result)


        setOriginalMileage(result.data.mileage);
        settype(result.data.type)
        setlicense(result.data.license)
        setmodel(result.data.model)
        setlocation(result.data.location)
        setyear(result.data.year)
        setseat(result.data.seat)
        setmileage(result.data.mileage)
        settransmission(result.data.transmission)
        setfuel(result.data.fuel)
        setperks(result.data.perks)
        setphotos(result.data.photos)
        setprice(result.data.price)
        setdescription(result.data.description)
        setStatus(result.data.status)


      })

      .catch(err => console.log(err))


  }, [])

  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const Update = async (e) => {
    e.preventDefault();
    const mileageDifference = mileage - originalMileage;
  
    if (mileageDifference >= 5000 && !warningShown) {
      showServiceWarningAlert();
      setWarningShown(true); // Set the flag to true to indicate the warning has been shown
    } 
   else {
      try {
        // Validate the form fields
        await Form_Validation.validate(
          {
            type,
            license,
            model,
            location,
            year,
            seat,
            mileage,
            transmission,
            fuel,
            perks,
            photos,
            price,
            description,
            status,
          },
          { abortEarly: false }
        );
  
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to update the form. Confirm?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, update it!',
          cancelButtonText: 'No, cancel',
        });
  
        if (result.isConfirmed) {
  
          const response = await axios.put(`/vehicles/updateVehicles/${id}`, {
            type,
            license,
            model,
            location,
            year,
            seat,
            mileage,
            transmission,
            fuel,
            perks,
            photos,
            price,
            description,
            status,
          });
  
          console.log(response);
  
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Form updated successfully!',
          }).then(() => {
            navigateBack();
          });
        }
      } catch (error) {
        if (error.name === 'ValidationError') {
          const errors = {};
          error.inner.forEach((err) => {
            errors[err.path] = err.message;
          });
          setValidationErrors(errors);
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Please check the following fields:',
            html: `<ul>${Object.values(errors).map((err) => `<li>${err}</li>`).join('')}</ul>`,
          });
        } else {
          console.error(error);
        }
      }
    }
  };
  

  return (
    <Default_Layout>
      
      <div className="py-4 px-4 mx-auto ">
        <form onSubmit={Update}>

          <div className="flex justify-between items-center">
            
            <div className="flex items-center ">
            {preInput('--- Update existing Vehicle ---')}
            </div>
            <StatusToggle status={status} onKeyUp={handleLicenseBlur} onToggle={handleStatusToggle} />
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

            <div>
              {preInput('Vehicle Type', 'Select the type of Vehicle.')}
              <select value={type}
              className='custom-input69 '
               onBlur={handleLicenseBlur}
               onChange={(e) => {
                settype(e.target.value)
                setValidationErrors({ ...validationErrors, type: '' }
                );
              }}>
                <option></option>
                <option>Car</option>
                <option>Motorcycle</option>
                <option>Bus</option>
                <option>Van</option>
                <option>Truck</option>
                <option>Three-Wheeler</option>
              </select>
              {validationErrors.type && (
                <p className="text-red-500 italic">* {validationErrors.type}</p>
              )}
            </div>


            <div>
              {preInput('Number Plate', 'Enter Characters in the Registration Plate. ')}

              <input
                type="text"
                className='custom-input69 '
                placeholder="e.g:-AB-2020"
                value={license}
                onChange={(e) => {
                  setlicense(e.target.value);
                  setValidationErrors({ ...validationErrors, license: '' });
                }}
                onKeyUp={handleLicenseBlur}
              />
              {validationErrors.license && (
                <p className="text-red-500 italic">* {validationErrors.license}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div>
              {preInput('Make & Model', 'Enter Make & Model of the Vehicle.')}
              <input
                type="text"
                placeholder=""
                value={model}
                className='custom-input69 '
                onKeyUp={handleLicenseBlur}
                onChange={(e) => {
                  setmodel(e.target.value);
                  setValidationErrors({ ...validationErrors, model: '' }); // Clear validation error
                }}
              />
              {validationErrors.model && (
                <p className="text-red-500 italic">* {validationErrors.model}</p>
              )}
            </div>

            <div>
              {preInput('Year', 'Vehicle Manufactured Year.')}
              <input
                type="number"
                placeholder=""
                value={year}
                className='custom-input69 '
                onKeyUp={handleLicenseBlur}
                onChange={(e) => {
                  setyear(e.target.value);
                  setValidationErrors({ ...validationErrors, year: '' });
                }}
              />
              {validationErrors.year && (
                <p className="text-red-500 italic">* {validationErrors.year}</p>
              )}
            </div>



            <div>

              {preInput('Fuel Capacity', 'Enter Fuel Capacity in Litres.')}
              <input
                type="number"
                className='custom-input69 '
                placeholder="e.g:-50"
                value={fuel}
                onKeyUp={handleLicenseBlur}
                onChange={(e) => {
                  setfuel(e.target.value);
                  setValidationErrors({ ...validationErrors, fuel: '' }); // Clear validation error
                }}
              />
              {validationErrors.fuel && (
                <p className="text-red-500 italic">* {validationErrors.fuel}</p>
              )}
            </div>


            <div>
              {preInput('Mileage', 'Enter Current Mileage of the Vehicle km/l.')}
              <input
                type="number"
                className='custom-input69 '
                placeholder="e.g:-20000"
                value={mileage}
                onKeyUp={handleLicenseBlur}
                onChange={(e) => {
                  setmileage(e.target.value);
                  setValidationErrors({ ...validationErrors, mileage: '' }); // Clear validation error
                }}
              />
              {validationErrors.mileage && (
                <p className="text-red-500 italic">* {validationErrors.mileage}</p>
              )}
            </div>

          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

            <div>
              {preInput('Transmission Type', '')}
              <div>
                <input

                  type="radio"
                  name="transmission"
                  value="Auto"
               
                  checked={transmission === "Auto"} // Check if "Auto" is selected
                  onKeyUp={handleLicenseBlur}
                  onChange={(e) => {
                    settransmission("Auto");
                    setValidationErrors({ ...validationErrors, transmission: '' });
                  }}
                />
                &nbsp;Auto
              </div>
              <div>
                <input
                  type="radio"
                  name="transmission"
                  value="Manual"
                 
                  checked={transmission === "Manual"}
                  onKeyUp={handleLicenseBlur}
                  onChange={(e) => {
                    settransmission("Manual");
                    setValidationErrors({ ...validationErrors, transmission: '' });
                  }}
                />
                &nbsp;Manual
              </div>
              {validationErrors.transmission && (
                <p className="text-red-500 italic">* {validationErrors.transmission}</p>
              )}
            </div>

            <div>
              {preInput('Location', 'Pickup & Dropoff location of the Vehicle.')}
              <input
                type="text"
                placeholder=""
                className='custom-input69 '
                value={location}
                onKeyUp={handleLicenseBlur}
                onChange={(e) => {
                  setlocation(e.target.value);
                  setValidationErrors({ ...validationErrors, location: '' }); // Clear validation error
                }}
              />
              {validationErrors.location && (
                <p className="text-red-500 italic">* {validationErrors.location}</p>
              )}
            </div>







            <div></div>
          </div>
          {preInput('Additional Features', 'Select additional features if available.')}
          <div className="grid mt-2 gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
            <Perks selected={perks}  onKeyUp={handleLicenseBlur} onChange={setperks} />
          </div>

          <div>
            {preInput('Photos', 'Upload full size images of the vehicle both Interior and Exterior.')}

            
            <Photos_Update addedPhotos={photos}  onKeyUp={handleLicenseBlur} onChange={setphotos} clearPhotoValidationError={clearPhotoValidationError} />
            {validationErrors.photos && (
              <p className="text-red-500 italic">* {validationErrors.photos}</p>
            )}
          </div>

          {preInput('Description', 'Enter some description of the Vehicle')}
          <textarea placeholder='Write Here' className='custom-input70'
            value={description} onChange={(e) => setdescription(e.target.value)} />


          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            
            
            <div>
              
            {preInput('Number of Seats')}
              <input
                type="number"
                value={seat}
                className='custom-input69 '
                onKeyUp={handleLicenseBlur}
                onChange={(e) => {
                  setseat(e.target.value);
                  setValidationErrors({ ...validationErrors, seat: '' }); 
                }}
              />
              {validationErrors.seat && (
                <p className="text-red-500 italic">* {validationErrors.seat}</p>
              )}
            </div>
            <div>
              
            {preInput('Price Per hour')}
              <input
                type="number"
                value={price}
                className='custom-input69 '
                onKeyUp={handleLicenseBlur}
                placeholder='e.g:-20000'
                onChange={(e) => {
                  setprice(e.target.value);
                  setValidationErrors({ ...validationErrors, price: '' }); 
                }}
              />
              {validationErrors.price && (
                <p className="text-red-500 italic">* {validationErrors.price}</p>
              )}
            </div>
          </div>






          <div className="text-left">
            <div className='py-4 mx-auto'>
              <button class="button-24  py-1 px-4" role="button">Update</button>
            </div>
          </div>

        </form>
      </div>
    </Default_Layout>
  )
}

export default Vehicle_Update