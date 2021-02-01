

export const search = async (data, profesion) => {
    let filteredData = data.filter(function(doctor) {
        let included = doctor.profesion == profesion;
        return included;
    });
    return filteredData;
};
