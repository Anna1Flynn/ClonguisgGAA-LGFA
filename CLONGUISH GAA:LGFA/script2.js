const VolunteerFormButton = document.getElementById("VolunteerFormButton");
const fundraiserFormButton = document.getElementById("fundraiserFormButton");
const VolunteerForm = document.getElementById("VolunteerForm");
const fundraiserForm = document.getElementById("fundraiserForm");


VolunteerFormButton.addEventListener("click", () => {
  if(VolunteerForm.style.display ==="block") {
    VolunteerForm.style.display="none";}
  else{
    VolunteerForm.style.display="block";
  fundraiserForm.style.display = "none";
  }
});

fundraiserFormButton.addEventListener("click", () => {
  if (fundraiserForm.style.display === "block") {
    fundraiserForm.style.display = "none"; // Hide form
  } else {
    fundraiserForm.style.display = "block"; // Show form
    VolunteerForm.style.display = "none"; // Hide other form
  }
});
