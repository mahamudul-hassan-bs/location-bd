import React, { useEffect, useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import bdGeo from "bangladesh-districts-upazilas";

interface Upazila {
  id: number;
  name: string;
  banglaName: string;
  districtId: number;
  district: string;
  divisionId: number;
  division: string;
}

type Thana = Upazila[];
type District = { id: number; name: string; thanas: Thana[] };

// --- Mock Data ---

const DependentDropdown: React.FC = () => {
  const [districtOpen, setDistrictOpen] = useState(false);
  const [thanaOpen, setThanaOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [upazilas, setUpazilas] = useState<Thana | null>(null);
  const [selectedThana, setSelectedThana] = useState<Upazila | null>(null);

  const districts: District[] = bdGeo.getAllDistricts();

  const upazilasT = bdGeo.getAllUpazilas();
  console.log(upazilasT.length);
  console.log(upazilasT)

  useEffect(() => {
    setUpazilas(bdGeo.getUpazilasByDistrict(selectedDistrict?.name));
  }, [selectedDistrict]);

  console.log(upazilas);

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      {/* District Dropdown */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select District
        </label>
        <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={districtOpen}
              className="w-full justify-between"
            >
              {selectedDistrict ? selectedDistrict.name : "Select district..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-white">
            <Command>
              <CommandInput placeholder="Search district..." />
              <CommandEmpty>No district found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {districts.map((district) => (
                    <CommandItem
                      key={district.id}
                      value={district.name}
                      onSelect={() => {
                        setSelectedDistrict(district);
                        setSelectedThana(null);
                        setDistrictOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedDistrict?.id === district.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {district.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Thana Dropdown */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Thana
        </label>
        <Popover open={thanaOpen} onOpenChange={setThanaOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={thanaOpen}
              disabled={!selectedDistrict}
              className="w-full justify-between"
            >
              {selectedThana
                ? selectedThana.name
                : selectedDistrict
                ? "Select thana..."
                : "Select a district first"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-white">
            <Command>
              <CommandInput placeholder="Search thana..." />
              <CommandEmpty>No thana found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {upazilas?.map((upazila: Upazila) => (
                    <CommandItem
                      key={upazila.id}
                      value={upazila.name}
                      onSelect={() => {
                        setSelectedThana(upazila);
                        setThanaOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedThana?.id === upazila.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {upazila.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Display Result */}
      <div className="p-4 border rounded-lg bg-gray-50">
        <p>
          <strong>District:</strong>{" "}
          {selectedDistrict ? selectedDistrict.name : "Not selected"}
        </p>
        <p>
          <strong>Thana:</strong>{" "}
          {selectedThana ? selectedThana.name : "Not selected"}
        </p>
      </div>
    </div>
  );
};

export default DependentDropdown;
