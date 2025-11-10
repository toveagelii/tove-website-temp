export default {
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	preview: {
		prepare() {
			return { title: 'Site Settings' }
		}
	},
	fields: [
		{
			name: 'homeTitle',
			title: 'Homepage Title',
			type: 'string',
			validation: Rule => Rule.required().min(1).max(120)
		},
		{
			name: 'homeSubtitle',
			title: 'Homepage Subtitle',
			type: 'string',
			validation: Rule => Rule.max(200)
		},
		{
			name: 'homeIntro',
			title: 'Homepage Intro/About Text',
			type: 'text',
			rows: 6,
			description: 'Longer intro/about content displayed on the homepage.'
		}
	]
};
