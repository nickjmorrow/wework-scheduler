import { laborerService } from "../laborers";
import { Assignment } from "./Assignment";
import { assignmentService } from "./assignmentService";
import { isDateEqual } from "~/utilities/isDateEqual";
import { assignmentGenerator } from "./assignmentGenerator";

const getTodaysAssignments = async () : Promise<Assignment[]> => {
	const today = new Date();
	const assignments = await assignmentService.getAssignments();
	const todaysAssignments = assignments.filter(a => isDateEqual(a.assignmentDate, today));

	return todaysAssignments;
}

const getOrCreateFutureAssignments = async () : Promise<Assignment[]> => {
	await assignmentGenerator.generateAssignments();
	const assignments : Assignment[] = [];
	return Promise.resolve(assignments);

}

const mailTodaysAssignments = async () => {
	const todaysAssignments = await getTodaysAssignments();
	
	// for each assignment, send mail to laborer
}

const mailFutureAssignments = async () => {
	const laborers = await laborerService.getLaborers();
	const futureAssignments = await getOrCreateFutureAssignments();

	// mail future assignments to all laborers
}