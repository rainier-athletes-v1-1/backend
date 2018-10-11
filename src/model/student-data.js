import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import mongooseToCsvQuotes from 'mongoose-to-csv-quotes';

import Profile from './profile';

const studentDataSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    autopopulate: { maxDepth: 1 },
  },
  lastPointTracker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PointTracker',
    autopopulate: true,
  },
  coaches: [{
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      autopopulate: { maxDepth: 1 },
    },
    currentCoach: Boolean, // note: A student can have more than one current coach
  }],
  sports: [{ 
    sport: String,
    team: String,
    league: String,
    teamCalendarUrl: String,
    currentlyPlaying: Boolean,
  }],
  mentors: [{
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      autopopulate: { maxDepth: 1 },
    },
    currentMentor: Boolean, // note: A student can only have ONE current mentor
  }],
  teachers: [{
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      autopopulate: { maxDepth: 1 },
    },
    currentTeacher: Boolean, // multiple current likely
  }],
  family: [{
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      autopopulate: { maxDepth: 1 },
    },
    weekdayGuardian: Boolean,
    weekendGuardian: Boolean,
  }],
  gender: String,
  school: [{ 
    schoolName: String, 
    currentSchool: Boolean,
    isElementarySchool: {
      type: Boolean,
      default: false,
    },
  }],
  dateOfBirth: Date,
  grade: Number,
  synopsisReportArchiveUrl: String,
  googleCalendarUrl: String,
  googleDocsUrl: String,
  synergy: {
    username: {
      type: String,
      default: '',
    },
    password: {
      type: String, // this should probably be at least base64 encoded
      default: '',
    },
  },
  createdAt: Date,
  updatedAt: Date,
}, { timestamps: true });

studentDataSchema.plugin(autopopulate);

const headers = [
  'createdAt',
  'student.firstName',
  'student.lastName',
  'gender',
  'grade',
  'dateOfBirth',
  'synopsisReportArchiveUrl',
  'googleCalendarUrl',
  'googleDocsUrl',
  'school1',
  'school1.currentSchool',
  'school2',
  'school2.currentSchool',
  'school3',
  'school3.currentSchool',
  'school4',
  'school4.currentSchool',
  'school5',
  'school5.currentSchool',
  'mentor1.firstName',
  'mentor1.lastName',
  'mentor1.currentMentor',
  'mentor2.firstName',
  'mentor2.lastName',
  'mentor2.currentMentor',
  'mentor3.firstName',
  'mentor3.lastName',
  'mentor3.currentMentor',
  'mentor4.firstName',
  'mentor4.lastName',
  'mentor4.currentMentor',
  'mentor5.firstName',
  'mentor5.lastName',
  'mentor5.currentMentor',
  'coach1.firstName',
  'coach1.lastName',
  'coach1.currentCoach',
  'coach2.firstName',
  'coach2.lastName',
  'coach2.currentCoach',
  'coach3.firstName',
  'coach3.lastName',
  'coach3.currentCoach',
  'coach4.firstName',
  'coach4.lastName',
  'coach4.currentCoach',
  'coach5.firstName',
  'coach5.lastName',
  'coach5.currentCoach',
  'sport1',
  'sport1.team',
  'sport1.league',
  'sport1.currentlyPlaying',
  'sport2',
  'sport2.team',
  'sport2.league',
  'sport2.currentlyPlaying',
  'sport3',
  'sport3.team',
  'sport3.league',
  'sport3.currentlyPlaying',
  'sport4',
  'sport4.team',
  'sport4.league',
  'sport4.currentlyPlaying',
  'sport5',
  'sport5.team',
  'sport5.league',
  'sport5.currentlyPlaying',
  'family1.firstName',
  'family1.lastName',
  'family1.weekdays',
  'family1.weekends',
  'family2.firstName',
  'family2.lastName',
  'family2.weekdays',
  'family2.weekends',
  'family3.firstName',
  'family3.lastName',
  'family3.weekdays',
  'family3.weekends',
  'family4.firstName',
  'family4.lastName',
  'family4.weekdays',
  'family4.weekends',
  'family5.firstName',
  'family5.lastName',
  'family5.weekdays',
  'family5.weekends',
  'teacher1.firstName',
  'teacher1.lastName',
  'teacher1.currentTeacher',
  'teacher2.firstName',
  'teacher2.lastName',
  'teacher2.currentTeacher',
  'teacher3.firstName',
  'teacher3.lastName',
  'teacher3.currentTeacher',
  'teacher4.firstName',
  'teacher4.lastName',
  'teacher4.currentTeacher',
  'teacher5.firstName',
  'teacher5.lastName',
  'teacher5.currentTeacher',
  'teacher6.firstName',
  'teacher6.lastName',
  'teacher6.currentTeacher',
  'teacher7.firstName',
  'teacher7.lastName',
  'teacher7.currentTeacher',
  'teacher8.firstName',
  'teacher8.lastName',
  'teacher8.currentTeacher',
  'teacher9.firstName',
  'teacher9.lastName',
  'teacher9.currentTeacher',
  'teacher10.firstName',
  'teacher10.lastName',
  'teacher10.currentTeacher',
  'teacher11.firstName',
  'teacher11.lastName',
  'teacher11.currentTeacher',
  'teacher12.firstName',
  'teacher12.lastName',
  'teacher12.currentTeacher',
  'teacher13.firstName',
  'teacher13.lastName',
  'teacher13.currentTeacher',
  'teacher14.firstName',
  'teacher14.lastName',
  'teacher14.currentTeacher',
  'teacher15.firstName',
  'teacher15.lastName',
  'teacher15.currentTeacher',
  'teacher16.firstName',
  'teacher16.lastName',
  'teacher16.currentTeacher',
  'teacher17.firstName',
  'teacher17.lastName',
  'teacher17.currentTeacher',
  'teacher18.firstName',
  'teacher18.lastName',
  'teacher18.currentTeacher',
  'teacher19.firstName',
  'teacher19.lastName',
  'teacher19.currentTeacher',
  'teacher20.firstName',
  'teacher20.lastName',
  'teacher20.currentTeacher',
];

const alias = {
  'school1': 'school[0].schoolName', // eslint-disable-line
  'school1.currentSchool': 'school[0].currentSchool',
  'school2': 'school[1].schoolName', // eslint-disable-line
  'school2.currentSchool': 'school[1].currentSchool',
  'school3': 'school[2].schoolName', // eslint-disable-line
  'school3.currentSchool': 'school[2].currentSchool',
  'school4': 'school[3].schoolName', // eslint-disable-line
  'school4.currentSchool': 'school[3].currentSchool',
  'school5': 'school[4].schoolName', // eslint-disable-line
  'school5.currentSchool': 'school[4].currentSchool',
  'mentor1.firstName': 'mentors[0].mentor.firstName',
  'mentor1.lastName': 'mentors[0].mentor.lastName',
  'mentor1.currentMentor': 'mentors[0].currentMentor',
  'mentor2.firstName': 'mentors[1].mentor.firstName',
  'mentor2.lastName': 'mentors[1].mentor.lastName',
  'mentor2.currentMentor': 'mentors[1].currentMentor',
  'mentor3.firstName': 'mentors[2].mentor.firstName',
  'mentor3.lastName': 'mentors[2].mentor.lastName',
  'mentor3.currentMentor': 'mentors[2].currentMentor',
  'mentor4.firstName': 'mentors[3].mentor.firstName',
  'mentor4.lastName': 'mentors[3].mentor.lastName',
  'mentor4.currentMentor': 'mentors[3].currentMentor',
  'mentor5.firstName': 'mentors[4].mentor.firstName',
  'mentor5.lastName': 'mentors[4].mentor.lastName',
  'mentor5.currentMentor': 'mentors[4].currentMentor',
  'coach1.firstName': 'coaches[0].coach.firstName',
  'coach1.lastName': 'coaches[0].coach.lastName',
  'coach1.currentCoach': 'coaches[0].currentCoach',
  'coach2.firstName': 'coaches[1].coach.firstName',
  'coach2.lastName': 'coaches[1].coach.lastName',
  'coach2.currentCoach': 'coaches[1].currentCoach',
  'coach3.firstName': 'coaches[2].coach.firstName',
  'coach3.lastName': 'coaches[2].coach.lastName',
  'coach3.currentCoach': 'coaches[2].currentCoach',
  'coach4.firstName': 'coaches[3].coach.firstName',
  'coach4.lastName': 'coaches[3].coach.lastName',
  'coach4.currentCoach': 'coaches[3].currentCoach',
  'coach5.firstName': 'coaches[4].coach.firstName',
  'coach5.lastName': 'coaches[4].coach.lastName',
  'coach5.currentCoach': 'coaches[4].currentCoach',
  'sport1': 'sports[0].sport', // eslint-disable-line
  'sport1.team': 'sports[0].team',
  'sport1.league': 'sports[0].league',
  'sport1.currentlyPlaying': 'sports[0].currentlyPlaying',
  'sport2': 'sports[1].sport', // eslint-disable-line
  'sport2.team': 'sports[1].team',
  'sport2.league': 'sports[1].league',
  'sport2.currentlyPlaying': 'sports[1].currentlyPlaying',
  'sport3': 'sports[2].sport', // eslint-disable-line
  'sport3.team': 'sports[2].team',
  'sport3.league': 'sports[2].league',
  'sport3.currentlyPlaying': 'sports[2].currentlyPlaying',
  'sport4': 'sports[3].sport', // eslint-disable-line
  'sport4.team': 'sports[3].team',
  'sport4.league': 'sports[3].league',
  'sport4.currentlyPlaying': 'sports[3].currentlyPlaying',
  'sport5': 'sports[4].sport', // eslint-disable-line
  'sport5.team': 'sports[4].team',
  'sport5.league': 'sports[4].league',
  'sport5.currentlyPlaying': 'sports[4].currentlyPlaying',
  'family1.firstName': 'family[0].member.firstName',
  'family1.lastName': 'family[0].member.lastName',
  'family1.weekdays': 'family[0].weekdayGuardian',
  'family1.weekends': 'family[0].weekendGuardian',
  'family2.firstName': 'family[1].member.firstName',
  'family2.lastName': 'family[1].member.lastName',
  'family2.weekdays': 'family[1].weekdayGuardian',
  'family2.weekends': 'family[1].weekendGuardian',
  'family3.firstName': 'family[2].member.firstName',
  'family3.lastName': 'family[2].member.lastName',
  'family3.weekdays': 'family[2].weekdayGuardian',
  'family3.weekends': 'family[2].weekendGuardian',
  'family4.firstName': 'family[3].member.firstName',
  'family4.lastName': 'family[3].member.lastName',
  'family4.weekdays': 'family[3].weekdayGuardian',
  'family4.weekends': 'family[3].weekendGuardian',
  'family5.firstName': 'family[4].member.firstName',
  'family5.lastName': 'family[4].member.lastName',
  'family5.weekdays': 'family[4].weekdayGuardian',
  'family5.weekends': 'family[4].weekendGuardian',
  'teacher1.firstName': 'teachers[0].teacher.firstName',
  'teacher1.lastName': 'teachers[0].teacher.lastName',
  'teacher1.currentTeacher': 'teachers[0].currentTeacher',
  'teacher2.firstName': 'teachers[1].teacher.firstName',
  'teacher2.lastName': 'teachers[1].teacher.lastName',
  'teacher2.currentTeacher': 'teachers[1].currentTeacher',
  'teacher3.firstName': 'teachers[2].teacher.firstName',
  'teacher3.lastName': 'teachers[2].teacher.lastName',
  'teacher3.currentTeacher': 'teachers[2].currentTeacher',
  'teacher4.firstName': 'teachers[3].teacher.firstName',
  'teacher4.lastName': 'teachers[3].teacher.lastName',
  'teacher4.currentTeacher': 'teachers[3].currentTeacher',
  'teacher5.firstName': 'teachers[4].teacher.firstName',
  'teacher5.lastName': 'teachers[4].teacher.lastName',
  'teacher5.currentTeacher': 'teachers[4].currentTeacher',
  'teacher6.firstName': 'teachers[5].teacher.firstName',
  'teacher6.lastName': 'teachers[5].teacher.lastName',
  'teacher6.currentTeacher': 'teachers[5].currentTeacher',
  'teacher7.firstName': 'teachers[6].teacher.firstName',
  'teacher7.lastName': 'teachers[6].teacher.lastName',
  'teacher7.currentTeacher': 'teachers[6].currentTeacher',
  'teacher8.firstName': 'teachers[7].teacher.firstName',
  'teacher8.lastName': 'teachers[7].teacher.lastName',
  'teacher8.currentTeacher': 'teachers[7].currentTeacher',
  'teacher9.firstName': 'teachers[8].teacher.firstName',
  'teacher9.lastName': 'teachers[8].teacher.lastName',
  'teacher9.currentTeacher': 'teachers[8].currentTeacher',
  'teacher10.firstName': 'teachers[9].teacher.firstName',
  'teacher10.lastName': 'teachers[9].teacher.lastName',
  'teacher10.currentTeacher': 'teachers[9].currentTeacher',
  'teacher11.firstName': 'teachers[10].teacher.firstName',
  'teacher11.lastName': 'teachers[10].teacher.lastName',
  'teacher11.currentTeacher': 'teachers[10].currentTeacher',
  'teacher12.firstName': 'teachers[11].teacher.firstName',
  'teacher12.lastName': 'teachers[11].teacher.lastName',
  'teacher12.currentTeacher': 'teachers[11].currentTeacher',
  'teacher13.firstName': 'teachers[12].teacher.firstName',
  'teacher13.lastName': 'teachers[12].teacher.lastName',
  'teacher13.currentTeacher': 'teachers[12].currentTeacher',
  'teacher14.firstName': 'teachers[13].teacher.firstName',
  'teacher14.lastName': 'teachers[13].teacher.lastName',
  'teacher14.currentTeacher': 'teachers[13].currentTeacher',
  'teacher15.firstName': 'teachers[14].teacher.firstName',
  'teacher15.lastName': 'teachers[14].teacher.lastName',
  'teacher15.currentTeacher': 'teachers[14].currentTeacher',
  'teacher16.firstName': 'teachers[15].teacher.firstName',
  'teacher16.lastName': 'teachers[15].teacher.lastName',
  'teacher16.currentTeacher': 'teachers[15].currentTeacher',
  'teacher17.firstName': 'teachers[16].teacher.firstName',
  'teacher17.lastName': 'teachers[16].teacher.lastName',
  'teacher17.currentTeacher': 'teachers[16].currentTeacher',
  'teacher18.firstName': 'teachers[17].teacher.firstName',
  'teacher18.lastName': 'teachers[17].teacher.lastName',
  'teacher18.currentTeacher': 'teachers[17].currentTeacher',
  'teacher19.firstName': 'teachers[18].teacher.firstName',
  'teacher19.lastName': 'teachers[18].teacher.lastName',
  'teacher19.currentTeacher': 'teachers[18].currentTeacher',
  'teacher20.firstName': 'teachers[19].teacher.firstName',
  'teacher20.lastName': 'teachers[19].teacher.lastName',
  'teacher20.currentTeacher': 'teachers[19].currentTeacher',
};

studentDataSchema.plugin(mongooseToCsvQuotes, { show_headers: true, headers, alias });

studentDataSchema.post('save', async (data) => {
  const student = await Profile.findById(data.student);
  if (student) student.studentData = data._id;
  return student ? student.save() : undefined;
});

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('StudentData', studentDataSchema, 'studentData', skipInit);
