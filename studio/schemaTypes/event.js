import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'venue',
      title: 'Venue / location line',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'sortDate',
      title: 'Date for sorting',
      type: 'datetime',
      description: 'Used for order only. The visible date lines below can stay deliberately vague.'
    }),
    defineField({
      name: 'dateLabelDe',
      title: 'Visible date / German',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'dateLabelEn',
      title: 'Visible date / English',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Type',
      type: 'string',
      initialValue: 'upcoming',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Visit by request', value: 'request' },
          { title: 'Past / archive', value: 'past' }
        ]
      }
    }),
    defineField({
      name: 'textDe',
      title: 'Text / German',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'textEn',
      title: 'Text / English',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'link',
      title: 'Optional internal link',
      type: 'string',
      description: 'Example: /inquire?subject=events'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'venue'
    }
  }
});
