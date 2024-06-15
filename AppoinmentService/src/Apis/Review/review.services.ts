

const {Review,Doctor,Patient,User} = require("../../Models/")
export const makeReview= async (data:any   )=>{
        try{
                const {rating,comment,doctorId,patientId}=data;
                const result = await Review.create({
                    rating,comment,doctorId,patientId
                });
                return result
        }catch(err){
            console.log(err);
            return "something went wrong"
        }
}

export const getReviews = async ()=>{
    try{
        const reviews = await Review.findAll({
            include: [
              {
                model: Doctor,
                as: 'doctor',
                include: [
                  {
                    model: User,
                    as: 'userdetails'
                  }
                ]
              },
              {
                model: Patient,
                as: 'patient',
                include: [
                  {
                    model: User,
                    as: 'userdetails'
                  }
                ]
              }
            ]
          });
          return reviews

    }catch(err){
        console.log(err);
        return "something went wrong"
    }
}

export const reviewOfDoctor =async (doctorId:any)=>{
      try{
        const reviews = await Review.findAll({
          where: { doctorId: doctorId },
          include: [
              {
                  model: Patient,
                  as: 'patient',
                  attributes: ['id', 'dateOfBirth', 'medicalHistory'], // Adjust attributes as needed
              },
          ],
      });
      return reviews
      }catch(err){
        console.log(err);
        return "something went wrong in service function"
      }
}
export const reviewOfPatient =async (patientId:any)=>{
  try{
    const reviews = await Review.findAll({
      where: { patientId: patientId },
      include: [
          {
              model: Doctor,
              as: 'doctor',
              attributes: ['id', 'specialization', 'fees'], // Adjust attributes as needed
          },
      ],
  });
  return reviews
  }catch(err){
    console.log(err);
    return "something went wrong in service function"
  }
}
