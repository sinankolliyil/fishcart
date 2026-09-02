import re

file_path = r'c:\Users\ANUPAMA\Desktop\fishcart\kiosk-app\src\components\cook\HowToCookPage.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to replace everything from   return ( to the end of the file.
new_return = '''  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white select-none">
      <div className="flex w-full flex-1 flex-col px-[clamp(20px,4vw,60px)] pt-[clamp(12px,2svh,24px)] pb-2 min-h-0 gap-[clamp(12px,2svh,24px)]">
        {/* Header */}
        <div className="flex shrink-0 flex-col">
          <h1 className="text-[clamp(20px,min(2.5vw,3svh),32px)] font-bold tracking-tight text-[#0B1F5B]">
            How to Cook
          </h1>
          <p className="mt-[clamp(2px,0.5svh,4px)] text-[clamp(12px,min(1vw,1.5svh),14px)] font-medium text-slate-500">
            Learn, cook and enjoy delicious recipes with step by step videos
          </p>

          {/* Categories */}
          <div className="mt-[clamp(8px,1.5svh,16px)] flex gap-[clamp(4px,0.5vw,8px)]">
            {(['All', 'Fish', 'Meat', 'Eggs'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'rounded-md border px-[clamp(12px,1.5vw,16px)] py-[clamp(4px,0.8svh,6px)] text-[clamp(12px,min(1vw,1.5svh),14px)] font-bold transition-colors',
                  activeCategory === cat
                    ? 'border-[#0D55CF] bg-[#0D55CF] text-white'
                    : 'border-gray-200 bg-white text-slate-600 hover:bg-gray-50'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Main Grid */}
        <div className="grid grid-cols-12 gap-[clamp(12px,2vw,24px)] min-h-0 flex-1">
          {/* A. Main Video Player (Left, spanning 6-7 cols) */}
          <div className="col-span-12 flex min-h-0 flex-col xl:col-span-6 2xl:col-span-7">
            <div className="group relative flex-1 min-h-0 w-full overflow-hidden rounded-xl bg-black">
              <Image
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                fill
                className="object-cover opacity-80"
              />

              {/* Giant Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="flex h-[clamp(40px,5vw,64px)] w-[clamp(40px,5vw,64px)] items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110 active:scale-95">
                  <Play className="ml-[clamp(2px,0.3vw,4px)] h-[clamp(20px,2.5vw,32px)] w-[clamp(20px,2.5vw,32px)] fill-black text-black" />
                </button>
              </div>

              {/* Mock Video Controls Bar */}
              <div className="absolute right-0 bottom-0 left-0 flex h-[clamp(30px,4vh,56px)] flex-col justify-end bg-gradient-to-t from-black/80 to-transparent px-4 pb-2 opacity-0 transition-opacity group-hover:opacity-100">
                {/* Progress bar */}
                <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-white/30">
                  <div className="h-full w-1/3 bg-[#0D55CF]"></div>
                </div>
                {/* Controls */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-[clamp(8px,1vw,16px)]">
                    <button>
                      <Play className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)] fill-white" />
                    </button>
                    <button>
                      <SkipBack className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)] fill-white" />
                    </button>
                    <button>
                      <SkipForward className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)] fill-white" />
                    </button>
                    <button>
                      <Volume2 className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]" />
                    </button>
                  </div>
                  <div className="flex items-center gap-[clamp(8px,1vw,16px)] text-[clamp(10px,min(0.8vw,1.2svh),12px)] font-medium">
                    <span>02:15 / {activeVideo.duration}</span>
                    <button>
                      <Settings className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]" />
                    </button>
                    <button>
                      <Maximize className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Details Below Player */}
            <div className="mt-[clamp(8px,1.5svh,16px)] shrink-0 flex flex-col">
              <h2 className="text-[clamp(16px,min(1.5vw,2svh),22px)] font-bold text-[#0B1F5B]">
                {activeVideo.title}
              </h2>

              <div className="mt-[clamp(6px,1svh,12px)] flex items-center justify-between">
                <div className="flex items-center gap-[clamp(12px,1.5vw,24px)]">
                  {/* Meta Items */}
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(activeVideo.category)}
                    <span className="text-[clamp(11px,min(1vw,1.4svh),14px)] font-semibold text-slate-600">
                      {activeVideo.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Target className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)] text-slate-400" />
                    <span className="text-[clamp(11px,min(1vw,1.4svh),14px)] font-semibold text-slate-600">
                      {activeVideo.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)] text-slate-400" />
                    <span className="text-[clamp(11px,min(1vw,1.4svh),14px)] font-semibold text-slate-600">
                      {activeVideo.time}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 rounded-lg bg-[#0D55CF] px-[clamp(8px,1vw,16px)] py-[clamp(4px,0.8svh,8px)] text-[clamp(11px,min(1vw,1.4svh),14px)] font-bold text-white transition-colors hover:bg-blue-700">
                    Save <Heart className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]" />
                  </button>
                  <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-[clamp(8px,1vw,16px)] py-[clamp(4px,0.8svh,8px)] text-[clamp(11px,min(1vw,1.4svh),14px)] font-bold text-slate-700 transition-colors hover:bg-gray-50">
                    <Share2 className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]" /> Share
                  </button>
                </div>
              </div>

              <p className="mt-[clamp(6px,1svh,16px)] max-w-[90%] text-[clamp(11px,min(1vw,1.4svh),14px)] leading-relaxed font-medium text-slate-500 line-clamp-2">
                {activeVideo.description}
              </p>
            </div>
          </div>

          {/* B. Ingredients Overview (Middle, spanning 3-4 cols) */}
          <div className="col-span-12 flex min-h-0 flex-col rounded-xl border border-gray-100 bg-white p-[clamp(12px,1.5vw,20px)] shadow-sm md:col-span-6 xl:col-span-3">
            <div className="mb-[clamp(8px,1.5svh,16px)] flex items-center justify-between border-b border-gray-100 pb-[clamp(8px,1.5svh,16px)] shrink-0">
              <h3 className="text-[clamp(14px,min(1.2vw,1.8svh),18px)] font-bold text-[#0B1F5B]">
                Ingredients Overview
              </h3>
              <span className="rounded bg-blue-50 px-2 py-1 text-[clamp(10px,min(0.8vw,1.2svh),12px)] font-bold text-[#0D55CF]">
                Serves {activeVideo.serves}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-[clamp(6px,1svh,16px)] overflow-y-auto scrollbar-minimal">
              {activeVideo.ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-[clamp(24px,2.5vw,32px)] w-[clamp(24px,2.5vw,32px)] items-center justify-center rounded-full border border-gray-100 bg-slate-50 text-[clamp(12px,min(1.2vw,1.8svh),18px)] shadow-sm">
                      {ing.icon}
                    </div>
                    <span className="text-[clamp(12px,min(1vw,1.5svh),14px)] font-semibold text-[#0E1A2B]">
                      {ing.name}
                    </span>
                  </div>
                  <span className="text-[clamp(11px,min(0.9vw,1.4svh),14px)] font-medium text-slate-500">
                    {ing.qty}
                  </span>
                </div>
              ))}
            </div>

            <button className="group mt-[clamp(8px,1.5svh,24px)] flex w-full shrink-0 items-center justify-between rounded-lg bg-[#F4F7FB] px-4 py-[clamp(8px,1.5svh,12px)] transition-colors hover:bg-[#E5EEFF]">
              <div className="flex items-center gap-2 text-[clamp(11px,min(1vw,1.4svh),14px)] font-bold text-[#0D55CF]">
                <Download className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]" /> Download Recipe
              </div>
              <span className="text-[clamp(10px,min(0.8vw,1.2svh),12px)] font-bold text-slate-400 transition-colors group-hover:text-[#0D55CF]">
                PDF
              </span>
            </button>
          </div>

          {/* C. Follow Other Videos (Right, spanning 2-3 cols) */}
          <div className="col-span-12 flex min-h-0 flex-col rounded-xl border border-gray-100 bg-white p-[clamp(12px,1.5vw,20px)] shadow-sm md:col-span-6 xl:col-span-3 2xl:col-span-2">
            <h3 className="mb-[clamp(8px,1.5svh,16px)] text-[clamp(14px,min(1.2vw,1.8svh),18px)] font-bold text-[#0B1F5B] shrink-0">
              Follow Other Videos
            </h3>
            <div className="scrollbar-minimal flex flex-1 flex-col gap-[clamp(8px,1.5svh,16px)] overflow-y-auto pr-2">
              {otherVideos.slice(0, 5).map((v) => (
                <div
                  key={v.id}
                  className="group flex cursor-pointer gap-3 shrink-0"
                  onClick={() => setActiveVideo(v)}
                >
                  <div className="relative h-[clamp(40px,5vh,60px)] w-[clamp(70px,8vw,100px)] shrink-0 overflow-hidden rounded-lg bg-black">
                    <Image
                      src={v.thumbnail}
                      alt={v.title}
                      fill
                      className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-[clamp(14px,1.5vw,20px)] w-[clamp(14px,1.5vw,20px)] fill-white text-white" />
                    </div>
                    <div className="absolute right-1 bottom-1 rounded bg-black/80 px-1 text-[clamp(8px,min(0.7vw,1svh),10px)] font-bold text-white">
                      {v.duration}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="line-clamp-2 text-[clamp(11px,min(1vw,1.4svh),14px)] leading-tight font-bold text-[#0B1F5B] transition-colors group-hover:text-[#0D55CF]">
                      {v.title}
                    </h4>
                    <span className="mt-[clamp(1px,0.2svh,2px)] text-[clamp(10px,min(0.8vw,1.2svh),12px)] font-medium text-slate-400">
                      {v.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Videos Section */}
        <div className="flex shrink-0 flex-col gap-[clamp(8px,1.5svh,16px)]">
          <div className="flex items-center justify-between">
            <h3 className="text-[clamp(16px,min(1.5vw,2svh),20px)] font-bold text-[#0B1F5B]">All Videos</h3>
            <Link
              href="/cook/videos"
              className="flex items-center gap-1 text-[clamp(12px,min(1vw,1.4svh),14px)] font-bold text-[#0D55CF] hover:underline"
            >
              View All <ChevronRight className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]" />
            </Link>
          </div>

          {/* Grid of 5 videos max */}
          <div className="grid grid-cols-1 gap-[clamp(12px,1.5vw,24px)] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {filteredVideos.slice(0, 5).map((v) => (
              <div
                key={v.id}
                className="group flex cursor-pointer flex-col"
                onClick={() => setActiveVideo(v)}
              >
                <div className="relative mb-[clamp(4px,1svh,12px)] aspect-video w-full overflow-hidden rounded-xl bg-black">
                  <Image
                    src={v.thumbnail}
                    alt={v.title}
                    fill
                    className="object-cover opacity-85 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-[clamp(24px,3vw,40px)] w-[clamp(24px,3vw,40px)] items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm transition-all group-hover:border-[#0D55CF] group-hover:bg-[#0D55CF]">
                      <Play className="ml-0.5 h-[clamp(10px,1.2vw,16px)] w-[clamp(10px,1.2vw,16px)] fill-white text-white" />
                    </div>
                  </div>
                  <div className="absolute right-[clamp(4px,0.5vw,8px)] bottom-[clamp(4px,0.5vw,8px)] rounded bg-black/80 px-1.5 py-0.5 text-[clamp(8px,min(0.7vw,1svh),12px)] font-bold text-white">
                    {v.duration}
                  </div>
                </div>

                <h4 className="mb-[clamp(2px,0.5svh,8px)] line-clamp-1 text-[clamp(12px,min(1vw,1.5svh),16px)] leading-tight font-bold text-[#0B1F5B] transition-colors group-hover:text-[#0D55CF]">
                  {v.title}
                </h4>

                <div className="flex items-center gap-[clamp(8px,1vw,16px)]">
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(v.category)}
                    <span className="text-[clamp(10px,min(0.8vw,1.2svh),12px)] font-semibold text-slate-500">
                      {v.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Target className="h-[clamp(10px,1vw,14px)] w-[clamp(10px,1vw,14px)] text-slate-400" />
                    <span className="text-[clamp(10px,min(0.8vw,1.2svh),12px)] font-semibold text-slate-500">
                      {v.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-[clamp(10px,1vw,14px)] w-[clamp(10px,1vw,14px)] text-slate-400" />
                    <span className="text-[clamp(10px,min(0.8vw,1.2svh),12px)] font-semibold text-slate-500">
                      {v.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}
'''

# Find the start of the return statement
idx = content.find('  return (')
if idx != -1:
    content = content[:idx] + new_return

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated successfully")
else:
    print("Could not find return statement")
