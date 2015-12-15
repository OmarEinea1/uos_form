function changeText() {
    if(translate.innerHTML == "عربي") {
        translate.innerHTML = "English"; PD.innerHTML = "المعلومات الشخصية"; SA.innerHTML = "عنوان الطالب"; Ed.innerHTML = "الدراسة"; Do.innerHTML = "الوثائق";
		FN.innerHTML = "الاسم الأول"; MN.innerHTML = "اسم الأب"; LN.innerHTML = "اسم العائلة";
		CiB.innerHTML = "مدينة الميلاد"; CoB.innerHTML = "مكان الميلاد"; Na.innerHTML = "الجنسية";
		city.placeholder = "مثلا دمشق"; country.placeholder = "مثلا سوريا"; nationality.placeholder = "مثلا سوريا";
		DB.innerHTML = "تاريخ الميلاد"; Re.innerHTML = "الديانة"; MS.innerHTML = "الحالة الإجتماعية";
		SN1.innerHTML = ":نعم"; SN2.innerHTML = "لا - هل لديك أية احتياجات خاصة جسدية أو ذهنية؟";
		DC.placeholder = "يرجى وصف حالتك"; Fi.innerHTML = "الأول"; Pr.innerHTML = "السابق"; La.innerHTML = "الأخير"; Ne.innerHTML = "التالي";

    } else if(translate.innerHTML == "English") {
        translate.innerHTML = "عربي"; PD.innerHTML = "PERSONAL DATA"; SA.innerHTML = "STUDENT ADDRESS"; Ed.innerHTML = "EDUCATION"; Do.innerHTML = "DOCUMENTS";
		FN.innerHTML = "First Name"; MN.innerHTML = "Middle Name"; LN.innerHTML = "Last Name";
		CiB.innerHTML = "City of Birth"; CoB.innerHTML = "Country of Birth"; Na.innerHTML = "Nationality";
		city.placeholder = "eg. Damascus"; country.placeholder = "eg. Syria"; nationality.placeholder = "eg. Syria";
		DB.innerHTML = "Date of Birth"; Re.innerHTML = "Religion"; MS.innerHTML = "Marital Status";
		SN1.innerHTML = "Do you have any special needs? No"; SN2.innerHTML = "Yes";
		DC.placeholder = "Please describe your condition"; Fi.innerHTML = "First"; Pr.innerHTML = "Previous"; La.innerHTML = "Last"; Ne.innerHTML = "Next";
    }
}
