const sheduleDisp = document.querySelector("section.shedule_disp")
const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function putClubSheduleToHTML(shedule) {
	sheduleLen = shedule.length;
	let currentDay = new Date()
		.getDay();

	shedule.sort((a, b) => a.timeslots[0].day - b.timeslots[0].day)

	for (i = 0; i < sheduleLen; i++) {
		let div = document.createElement("div");
		let head_3 = document.createElement("h3");
		let multi_t = document.createElement("div");
		let wra_p = document.createElement("div");
		let note_p = document.createElement("code");

		let timeslotLen = shedule[i].timeslots.length;

		head_3.innerText = shedule[i].name;
		note_p.innerText = shedule[i].note || 'Meet you there!';

		for (let j = 0; j < timeslotLen; j++) {
			let time_p = document.createElement("p");
			let loc_p = document.createElement("p");
			let wra_p = document.createElement("div");
			let day_p = document.createElement("p");

			if (shedule[i].timeslots[j].day == currentDay)
				div.className = "today"

			time_p.innerText = `From ${shedule[i].timeslots[j].startTime} to ${shedule[i].timeslots[j].endTime}`;
			loc_p.innerText = `Location: ${shedule[i].timeslots[j].location || '\\(o_o)/'}`;
			day_p.innerText = daysOfTheWeek[shedule[i].timeslots[j].day]

			time_p.className = "meet_time";
			loc_p.className = "meet_location";
			wra_p.className = "wrapper_t";
			day_p.className = "meet_day";

			wra_p.appendChild(day_p)
			wra_p.appendChild(time_p);
			wra_p.appendChild(loc_p);

			multi_t.appendChild(wra_p);
		}

		multi_t.className = "multiple";
		note_p.className = "note_para";

		div.appendChild(head_3);
		div.appendChild(multi_t);
		div.appendChild(note_p);
		sheduleDisp.appendChild(div);

	}
}

data_url = "https://gist.githubusercontent.com/gekkowrld/f28be5bc166f9fe9a202649386da6a4c/raw/data.json"
fetch(data_url)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		putClubSheduleToHTML(data);
	})

