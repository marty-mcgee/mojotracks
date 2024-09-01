import React from 'react'
import { shallow } from 'enzyme'
import { groupPresets, PresetModal } from 'containers/PresetManager'

const load = id => ({
    fork: (rej, res) => res({ default: id })
})

const presets = [
    {
        id: 'adtr',
        description: 'ADTR Breakdown',
        group: 'Pop Punk',
        load: load('adtr'),
    },
    {
        id: 'black-dahlia',
        description: 'Blast Beats',
        group: 'Heavy',
        load: load('black-dahlia'),
    },
    {
        id: 'contortionist',
        description: 'Poly Chords & Melody',
        group: 'Progressive',
        load: load('contortionist'),
    },
    {
        id: 'polyrhythms',
        description: 'Polyrhythms',
        group: 'Progressive',
        load: load('polyrhythms'),
    },
    {
        id: 'sworn-in',
        description: 'Sworn In',
        group: 'Artist',
        load: load('sworn-in'),
    },
    {
        id: 'meshuggah',
        description: 'Meshuggah',
        group: 'Mojo',
        load: load('meshuggah'),
    },
    {
        id: 'thall',
        description: 'Thall I',
        group: 'Mojo',
        load: load('thall'),
    },
    {
        id: 'thall-buster',
        description: 'Thall II',
        group: 'Mojo',
        load: load('thall-buster'),
    },
    {
        id: 'thall-triplets',
        description: 'Thall III',
        group: 'Mojo',
        load: load('thall-triplets'),
    },
]

describe('<PresetModal />', () => {
    it('fires onChange with selected preset when changed', () => {
        const activePresetID = 'thall'
        const onChange = jest.fn()
        const props = {
            onChange,
            presets,
        }
        const wrapper = shallow(<PresetModal {...props} />)
        wrapper
            .find('[value="thall"]')
            .simulate('click', { target: { value: activePresetID } })
        const returnedAllowedLength = onChange.mock.calls[0][0]

        expect(returnedAllowedLength)
            .toBe(activePresetID)
    })
    it('renders groups of presets in <div> tags', () => {
        const onChange = jest.fn()
        const props = {
            onChange,
            presets,
        }
        const wrapper = shallow(<PresetModal {...props} />)
        const groupMojo = wrapper
            .find('div[data-group="Mojo"]')
        const groupProgressive = wrapper
            .find('div[data-group="Progressive"]')

        expect(groupMojo.exists())
            .toBe(true)
        expect(groupProgressive.exists())
            .toBe(true)
    })
    it('renders the correct presets inside the <div> tags', () => {
        const onChange = jest.fn()
        const props = {
            onChange,
            presets,
        }
        const wrapper = shallow(<PresetModal {...props} />)
        const groupMojo = wrapper
            .find('div[data-group="Mojo"]')
        const thallPreset = groupMojo
            .find('[value="thall"]')
        const meshuggahPreset = groupMojo
            .find('[value="meshuggah"]')

        expect(thallPreset.exists())
            .toBe(true)
        expect(meshuggahPreset.exists())
            .toBe(true)
    })
})

describe('groupPresets function', () => {
    it('groups the presets into an array of groups of presets', () => {
        const startingArray = [
            { group: 'Heavy' },
            { group: 'Progressive' },
            { group: 'Mojo' },
            { group: 'Heavy' },
            { group: 'Mojo' },
        ]
        const expectedResult = [
            [
                { group: 'Heavy' },
                { group: 'Heavy' },
            ],
            [
                { group: 'Progressive' },
            ],
            [
                { group: 'Mojo' },
                { group: 'Mojo' },
            ],
        ]

        expect(groupPresets(startingArray)).toEqual(expectedResult)
    })
})
