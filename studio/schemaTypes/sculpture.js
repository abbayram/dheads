import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sculpture',
  title: 'Objects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Page slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'code',
      title: 'Object code',
      type: 'string',
      description: 'Example: DH-031',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Availability',
      type: 'string',
      initialValue: 'available',
      options: {
        layout: 'radio',
        list: [
          { title: 'Inquiry open', value: 'available' },
          { title: 'On hold', value: 'held' },
          { title: 'Acquired / archive', value: 'acquired' }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      initialValue: new Date().getFullYear(),
      validation: (rule) => rule.required().min(2020).max(2100)
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'string',
      options: {
        list: ['PUBLIC AFFAIRS', 'SOFT POWER', 'PRIVATE MATTERS', 'OFFICE HOURS']
      }
    }),
    defineField({
      name: 'mainImage',
      title: 'Main object image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string'
            })
          ]
        }
      ],
      options: { layout: 'grid' }
    }),
    defineField({
      name: 'modelGlb',
      title: '3D model / GLB (prepared for phase 2)',
      type: 'file',
      description: 'Upload a .glb file here. Phase 1 shows a prepared 3D slot; the viewer can be activated later.',
      options: {
        accept: '.glb,model/gltf-binary'
      }
    }),
    defineField({
      name: 'summaryDe',
      title: 'Short line / German',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(180)
    }),
    defineField({
      name: 'summaryEn',
      title: 'Short line / English',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(180)
    }),
    defineField({
      name: 'statementDe',
      title: 'Object text / German',
      type: 'text',
      rows: 5
    }),
    defineField({
      name: 'statementEn',
      title: 'Object text / English',
      type: 'text',
      rows: 5
    }),
    defineField({
      name: 'materialDe',
      title: 'Material / German',
      type: 'string'
    }),
    defineField({
      name: 'materialEn',
      title: 'Material / English',
      type: 'string'
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'Example: 24 × 12 × 10 cm'
    }),
    defineField({
      name: 'featured',
      title: 'Show on home page',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'colour',
      title: 'Placeholder colour',
      type: 'string',
      initialValue: '#ff9ede',
      description: 'Hex value used until photography is uploaded.'
    }),
    defineField({
      name: 'accent',
      title: 'Placeholder accent',
      type: 'string',
      initialValue: '#f6edfc'
    }),
    defineField({
      name: 'variant',
      title: 'Placeholder form',
      type: 'number',
      initialValue: 1,
      validation: (rule) => rule.integer().min(1).max(6)
    }),
    defineField({
      name: 'orderRank',
      title: 'Manual order',
      type: 'number',
      initialValue: 100
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'code',
      media: 'mainImage',
      status: 'status'
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: `${subtitle || 'NO CODE'} / ${status || 'NO STATUS'}`,
        media
      };
    }
  }
});
