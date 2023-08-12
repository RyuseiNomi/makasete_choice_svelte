import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { members, groupNumber } = await request.json();

  const shuffledMembers = shuffleArray(members);
  const assignedMembers = assignMemberToGroup(shuffledMembers, groupNumber);
	return json({ assignedMembers }, { status: 201 });
}

const shuffleArray = (array) => {
  const cloneArray = [...array];

  for ( let i = cloneArray.length - 1; i >= 0; i-- ) {
    let rand = Math.floor(Math.random() * ( i + 1 ));
    let member = cloneArray[i];
    cloneArray[i] = cloneArray[rand];
    cloneArray[rand] = member;
  }

  return cloneArray;
}

const assignMemberToGroup = (array, groupNumber) => {
  let members = [...array];
  let result = [];
  const maxMemberCount = Math.ceil( array.length / groupNumber );

  for ( let i = 0; i <= groupNumber - 1; i++ ) {
    let group = [];
    for ( let j = 1; j <= maxMemberCount; j++ ) {
      group.push(members[0]);
      // メンバーの先頭を取り除くことで、メンバーの重複を避ける
      members.splice(0, 1);
    }
    result.push(group);
  }

  return result;
}
