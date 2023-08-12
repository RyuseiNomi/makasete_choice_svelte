import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { members, groupNumber } = await request.json();

  const choicedMembers = members;
  const groupNumbers = groupNumber;
	return json({ choicedMembers, groupNumbers }, { status: 201 });
}
