import Image from 'next/image'

const positions = [
  'object-[left_top]',    // top-left
  'object-[right_top]',   // top-right
  'object-[left_bottom]', // bottom-left
  'object-[right_bottom]' // bottom-right
]

export default function ImageCollage({
  src = '../public/20250302_220923.jpg',
  alt = 'Profile collage',
  size = 200
}) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {positions.map((pos, i) => (
          <div
            key={pos}
            className={`
              w-[${size}px] h-[${size}px]
              rounded-lg
              overflow-hidden
              bg-gray-800 dark:bg-gray-900
              transition-all duration-300
              hover:scale-105
              hover:shadow-lg
              hover:shadow-green-400/20
              shadow
            `}
          >
            <Image
              src={src}
              alt={alt}
              width={size}
              height={size}
              className={`w-full h-full object-cover ${pos} transition-all duration-300`}
              priority
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}231``